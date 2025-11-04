import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import { requireAdmin } from '@/lib/admin-auth'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const totalRequestsResult = await pool.query('SELECT COUNT(*) FROM removal_requests')
    const totalRequests = parseInt(totalRequestsResult.rows[0].count)

    const statusResult = await pool.query('SELECT status, COUNT(*) as count FROM removal_requests GROUP BY status')
    const requestsByStatus = statusResult.rows.reduce((acc, row) => {
      acc[row.status] = parseInt(row.count)
      return acc
    }, {} as Record<string, number>)

    const cityResult = await pool.query('SELECT city, COUNT(*) as count FROM removal_requests GROUP BY city')
    const requestsByCity = cityResult.rows.reduce((acc, row) => {
      acc[row.city] = parseInt(row.count)
      return acc
    }, {} as Record<string, number>)

    const brandResult = await pool.query('SELECT vehicle_brand, COUNT(*) as count FROM removal_requests GROUP BY vehicle_brand')
    const requestsByBrand = brandResult.rows.reduce((acc, row) => {
      acc[row.vehicle_brand] = parseInt(row.count)
      return acc
    }, {} as Record<string, number>)

    const recentResult = await pool.query(
      'SELECT COUNT(*) FROM removal_requests WHERE created_at >= $1',
      [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)]
    )
    const recentRequests = parseInt(recentResult.rows[0].count)

    const thisMonthResult = await pool.query(
      'SELECT COUNT(*) FROM removal_requests WHERE created_at >= $1',
      [new Date(new Date().getFullYear(), new Date().getMonth(), 1)]
    )
    const thisMonthRequests = parseInt(thisMonthResult.rows[0].count)

    const lastMonthResult = await pool.query(
      'SELECT COUNT(*) FROM removal_requests WHERE created_at >= $1 AND created_at < $2',
      [
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ]
    )
    const lastMonthRequests = parseInt(lastMonthResult.rows[0].count)

    const monthlyGrowth = lastMonthRequests && lastMonthRequests > 0
      ? Math.round(((thisMonthRequests - lastMonthRequests) / lastMonthRequests) * 100)
      : 0

    return NextResponse.json({
      totalRequests,
      requestsByStatus,
      requestsByCity,
      requestsByBrand,
      recentRequests,
      thisMonthRequests,
      monthlyGrowth
    })

  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}