import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

export async function POST(request: NextRequest) {
  let client
  try {
    const data = await request.json()
    
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    client = await pool.connect()
    
    const result = await client.query(`
      INSERT INTO contact_messages (
        id, first_name, last_name, email, phone, subject, message, status, created_at, updated_at
      ) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id
    `, [
      data.firstName, data.lastName, data.email, 
      data.phone || null, data.subject, data.message, 'new'
    ])
    
    return NextResponse.json({ success: true, id: result.rows[0].id })
    
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  } finally {
    if (client) client.release()
  }
}