import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { requireAdmin } from '@/lib/admin-auth'

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
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )
    
    return NextResponse.json({ messages: result.rows })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
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
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
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
      `UPDATE contact_messages SET ${updates.join(', ')} WHERE id = $${++paramCount}`,
      values
    )
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}