import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { requireAdmin } from '@/lib/admin-auth'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

export async function GET() {
  try {
    await requireAdmin()
    
    const result = await pool.query(
      'SELECT * FROM removal_requests ORDER BY created_at DESC'
    )
    
    return NextResponse.json({ requests: result.rows })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { id, status, admin_notes } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }
    
    let query = 'UPDATE removal_requests SET updated_at = NOW()'
    const values = []
    let paramCount = 0
    
    if (status) {
      query += `, status = $${++paramCount}`
      values.push(status)
    }
    
    if (admin_notes !== undefined) {
      query += `, admin_notes = $${++paramCount}`
      values.push(admin_notes)
    }
    
    query += ` WHERE id = $${++paramCount}`
    values.push(id)
    
    console.log('Updating request:', { id, status, admin_notes, query, values })
    
    await pool.query(query, values)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}