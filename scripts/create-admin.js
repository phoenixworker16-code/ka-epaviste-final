const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

async function createAdmin() {
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ka_auto_epaves',
    password: process.env.DB_PASSWORD || 'test123',
    port: parseInt(process.env.DB_PORT || '5432'),
  })

  try {
    const client = await pool.connect()
    
    // Supprimer l'admin existant s'il y en a un
    await client.query('DELETE FROM admin_users WHERE email = $1', ['admin@ka-auto-epaves.fr'])
    await client.query('DELETE FROM users WHERE email = $1', ['admin@ka-auto-epaves.fr'])
    
    // Créer le nouvel admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    // Créer l'utilisateur dans la table users
    const userResult = await client.query(`
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id
    `, ['admin@ka-auto-epaves.fr', hashedPassword])
    
    const userId = userResult.rows[0].id
    
    // Créer l'entrée admin
    await client.query(`
      INSERT INTO admin_users (id, email, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5)
    `, [userId, 'admin@ka-auto-epaves.fr', 'Admin', 'KA Auto Épaves', 'super_admin'])
    
    console.log('✅ Utilisateur admin créé avec succès!')
    console.log('📧 Email: admin@ka-auto-epaves.fr')
    console.log('🔑 Mot de passe: admin123')
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

createAdmin()