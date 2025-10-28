import { query } from '../database'

export interface RemovalRequest {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  vehicle_brand: string
  vehicle_model: string
  vehicle_year?: number
  license_plate?: string
  vehicle_condition: 'accidente' | 'en_panne' | 'hors_service' | 'autre'
  address: string
  city: string
  postal_code: string
  additional_info?: string
  photo_urls?: string[]
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  admin_notes?: string
  estimated_pickup_date?: string
  actual_pickup_date?: string
}

export async function createRemovalRequest(data: Omit<RemovalRequest, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const result = await query(`
    INSERT INTO removal_requests (
      first_name, last_name, email, phone,
      vehicle_brand, vehicle_model, vehicle_year, license_plate, vehicle_condition,
      address, city, postal_code, additional_info, photo_urls
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `, [
    data.first_name, data.last_name, data.email, data.phone,
    data.vehicle_brand, data.vehicle_model, data.vehicle_year, data.license_plate, data.vehicle_condition,
    data.address, data.city, data.postal_code, data.additional_info, data.photo_urls
  ])
  
  return result.rows[0]
}

export async function getAllRemovalRequests() {
  const result = await query(`
    SELECT * FROM removal_requests 
    ORDER BY created_at DESC
  `)
  
  return result.rows
}

export async function getRemovalRequestById(id: string) {
  const result = await query(`
    SELECT * FROM removal_requests 
    WHERE id = $1
  `, [id])
  
  return result.rows[0]
}

export async function updateRemovalRequest(id: string, data: Partial<RemovalRequest>) {
  const fields = Object.keys(data).filter(key => key !== 'id')
  const values = fields.map(field => data[field as keyof RemovalRequest])
  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
  
  const result = await query(`
    UPDATE removal_requests 
    SET ${setClause}, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `, [id, ...values])
  
  return result.rows[0]
}