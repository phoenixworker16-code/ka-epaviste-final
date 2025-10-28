import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// API finale - version robuste

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function POST(request: NextRequest) {
  let client
  try {
    const data = await request.json()
    
    // Validation
    if (!data.first_name || !data.last_name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    client = await pool.connect()
    
    // Insertion avec les noms exacts des colonnes de la base
    const result = await client.query(`
      INSERT INTO removal_requests (
        first_name, last_name, email, phone,
        vehicle_brand, vehicle_model, vehicle_year, license_plate, vehicle_condition,
        address, city, postal_code, additional_info, photo_urls, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      RETURNING id, first_name, last_name, email
    `, [
      data.first_name,
      data.last_name, 
      data.email,
      data.phone,
      data.vehicle_brand || '',
      data.vehicle_model || '',
      data.vehicle_year ? parseInt(data.vehicle_year) : null,
      data.license_plate || null,
      data.vehicle_condition || 'autre',
      data.address || '',
      data.city || '',
      data.postal_code || '',
      data.additional_info || null,
      data.photo_urls ? JSON.stringify(data.photo_urls) : '[]',
      'pending'
    ])
    
    return NextResponse.json({ 
      success: true, 
      request: result.rows[0]
    })
    
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de l\'enregistrement de la demande',
      details: error.message 
    }, { status: 500 })
  } finally {
    if (client) {
      client.release()
    }
  }
}