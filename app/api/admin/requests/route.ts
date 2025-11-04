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

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    
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
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    
    const { id, status, admin_notes } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }
    
    const updates = ['updated_at = NOW()']
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
    
    values.push(id)
    const query = `UPDATE removal_requests SET ${updates.join(', ')} WHERE id = $${++paramCount}`
    
    console.log('Updating request:', { id, status, admin_notes, query, values })
    
    const result = await pool.query(query, values)
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Demande non trouvée' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}