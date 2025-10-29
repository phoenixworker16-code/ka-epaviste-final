import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '@/lib/admin-auth'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function POST(request: NextRequest) {
  try {
    const adminUser = await requireAdmin()
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Mots de passe requis' }, { status: 400 })
    }

    // Vérifier le mot de passe actuel
    const result = await pool.query('SELECT password_hash FROM admin_users WHERE id = $1', [adminUser.id])
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    const isValidPassword = await bcrypt.compare(currentPassword, result.rows[0].password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 })
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Mettre à jour le mot de passe
    await pool.query(
      'UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, adminUser.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}