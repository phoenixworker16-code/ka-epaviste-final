const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' })

// Configuration de la base de données
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Se connecter à la DB par défaut pour créer notre DB
  password: process.env.DB_PASSWORD || 'admin',
  port: parseInt(process.env.DB_PORT || '5432'),
})

async function initDatabase() {
  const client = await pool.connect()
  
  try {
    // Créer la base de données si elle n'existe pas
    await client.query(`
      SELECT 1 FROM pg_database WHERE datname = 'ka_auto_epaves'
    `).then(async (result) => {
      if (result.rows.length === 0) {
        await client.query('CREATE DATABASE ka_auto_epaves')
        console.log('✅ Base de données ka_auto_epaves créée')
      } else {
        console.log('✅ Base de données ka_auto_epaves existe déjà')
      }
    })
  } catch (error) {
    console.error('Erreur lors de la création de la base de données:', error)
  } finally {
    client.release()
  }

  // Se connecter à notre nouvelle base de données
  const appPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ka_auto_epaves',
    password: process.env.DB_PASSWORD || 'admin',
    port: parseInt(process.env.DB_PORT || '5432'),
  })

  const appClient = await appPool.connect()

  try {
    // Lire et exécuter le script SQL
    const sqlScript = fs.readFileSync(
      path.join(__dirname, '001_create_tables.sql'),
      'utf8'
    )

    // Adapter le script pour PostgreSQL local (sans auth.users)
    const adaptedScript = sqlScript
      .replace(/REFERENCES auth\.users\(id\)/g, 'REFERENCES users(id)')
      .replace(/auth\.uid\(\)/g, 'current_user_id()')

    // Créer d'abord la table users
    await appClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    // Créer une fonction pour simuler auth.uid()
    await appClient.query(`
      CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
      BEGIN
        -- Pour le développement, retourner un UUID fixe
        -- En production, vous devrez implémenter une vraie authentification
        RETURN '00000000-0000-0000-0000-000000000000'::UUID;
      END;
      $$ LANGUAGE plpgsql;
    `)

    await appClient.query(adaptedScript)
    console.log('✅ Tables créées avec succès')

  } catch (error) {
    console.error('Erreur lors de la création des tables:', error)
  } finally {
    appClient.release()
    await appPool.end()
  }

  await pool.end()
}

initDatabase().catch(console.error)