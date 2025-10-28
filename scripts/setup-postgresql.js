const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

async function setupPostgreSQL() {
  console.log('🚀 Configuration de PostgreSQL pour KA Auto Épaves...\n')

  // Configuration de la base de données
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres', // Se connecter à la DB par défaut
    password: process.env.DB_PASSWORD || 'test123',
    port: parseInt(process.env.DB_PORT || '5432'),
  })

  try {
    // Test de connexion
    console.log('🔍 Test de connexion à PostgreSQL...')
    const client = await pool.connect()
    console.log('✅ Connexion réussie à PostgreSQL')

    // Créer la base de données si elle n'existe pas
    console.log('📦 Création de la base de données...')
    const dbExists = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = $1
    `, [process.env.DB_NAME || 'ka_auto_epaves'])

    if (dbExists.rows.length === 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME || 'ka_auto_epaves'}`)
      console.log('✅ Base de données créée')
    } else {
      console.log('✅ Base de données existe déjà')
    }

    client.release()

    // Se connecter à la nouvelle base de données
    const appPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ka_auto_epaves',
      password: process.env.DB_PASSWORD || 'test123',
      port: parseInt(process.env.DB_PORT || '5432'),
    })

    const appClient = await appPool.connect()

    // Créer les tables manquantes
    console.log('🏗️  Vérification des tables...')
    
    // Vérifier si la table removal_requests a toutes les colonnes nécessaires
    const tableExists = await appClient.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'removal_requests' AND table_schema = 'public'
    `)
    
    if (tableExists.rows.length === 0) {
      // Table des demandes d'enlèvement
      await appClient.query(`
        CREATE TABLE removal_requests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          vehicle_brand VARCHAR(100) NOT NULL,
          vehicle_model VARCHAR(100) NOT NULL,
          vehicle_year INTEGER,
          license_plate VARCHAR(20),
          vehicle_condition VARCHAR(50) NOT NULL CHECK (vehicle_condition IN ('accidente', 'en_panne', 'hors_service', 'autre')),
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          postal_code VARCHAR(10) NOT NULL,
          additional_info TEXT,
          photo_urls TEXT[],
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
          admin_notes TEXT,
          estimated_pickup_date DATE,
          actual_pickup_date DATE
        )
      `)
      console.log('✅ Table removal_requests créée')
    } else {
      console.log('✅ Tables existantes vérifiées')
    }

    // Créer un utilisateur admin par défaut
    console.log('👤 Création de l\'utilisateur admin...')
    const adminExists = await appClient.query(
      'SELECT 1 FROM users WHERE email = $1',
      ['admin@ka-auto-epaves.fr']
    )

    if (adminExists.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      // D'abord créer l'utilisateur dans la table users
      const userResult = await appClient.query(`
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id
      `, ['admin@ka-auto-epaves.fr', hashedPassword])
      
      const userId = userResult.rows[0].id
      
      // Ensuite créer l'entrée admin
      await appClient.query(`
        INSERT INTO admin_users (id, email, first_name, last_name, role)
        VALUES ($1, $2, $3, $4, $5)
      `, [userId, 'admin@ka-auto-epaves.fr', 'Admin', 'KA Auto Épaves', 'super_admin'])
      
      console.log('✅ Utilisateur admin créé')
      console.log('📧 Email: admin@ka-auto-epaves.fr')
      console.log('🔑 Mot de passe: admin123')
    } else {
      console.log('✅ Utilisateur admin existe déjà')
    }

    appClient.release()
    await appPool.end()
    await pool.end()

    console.log('\n🎉 Configuration terminée avec succès!')
    console.log('🌐 Vous pouvez maintenant démarrer votre application avec: npm run dev')
    console.log('🔐 Accès admin: http://localhost:3000/admin/login')

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error)
    process.exit(1)
  }
}

setupPostgreSQL()