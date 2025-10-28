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
    
    const updates = []
    const values = []
    let paramCount = 0
    
    if (status) {
      updates.push(`status = $${++paramCount}`)
      values.push(status)
    }
    
    if (admin_notes !== undefined) {
      updates.push(`admin_notes = $${++paramCount}`)
      values.push(admin_notes)
    }
    
    updates.push(`updated_at = NOW()`)
    values.push(id)
    
    await pool.query(
      `UPDATE removal_requests SET ${updates.join(', ')} WHERE id = $${++paramCount}`,
      values
    )
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}