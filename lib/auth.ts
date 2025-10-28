import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 1, // Limite les connexions pour Vercel
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export interface AdminUser {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
}

export async function verifyAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email]
    )
    
    if (result.rows.length === 0) return null
    
    const admin = result.rows[0]
    const isValid = await bcrypt.compare(password, admin.password)
    
    if (!isValid) return null
    
    return {
      id: admin.id,
      email: admin.email,
      first_name: admin.first_name,
      last_name: admin.last_name,
      role: admin.role
    }
  } catch (error) {
    console.error('Error verifying admin:', error)
    return null
  }
}

export function generateToken(admin: AdminUser): string {
  return jwt.sign(
    { 
      id: admin.id, 
      email: admin.email, 
      role: admin.role 
    },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch {
    return null
  }
}

export async function getAdminFromCookie(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  
  if (!token) return null
  
  return verifyToken(token)
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminFromCookie()
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}