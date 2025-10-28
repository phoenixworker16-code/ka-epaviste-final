const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Configuration de la base de données
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

async function executeSQL(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8')
    console.log(`Exécution de ${path.basename(filePath)}...`)
    await pool.query(sql)
    console.log(`✅ ${path.basename(filePath)} exécuté avec succès`)
  } catch (error) {
    console.error(`❌ Erreur lors de l'exécution de ${path.basename(filePath)}:`, error.message)
    throw error
  }
}

async function initCompleteDatabase() {
  try {
    console.log('🚀 Initialisation complète de la base de données KA Auto Épaves...\n')

    // Scripts à exécuter dans l'ordre
    const scripts = [
      '001_create_tables.sql',
      '002_create_storage_bucket.sql', 
      '003_create_admin_user.sql',
      '004_additional_tables.sql',
      '005_insert_base_data.sql'
    ]

    // Exécuter chaque script
    for (const script of scripts) {
      const scriptPath = path.join(__dirname, script)
      if (fs.existsSync(scriptPath)) {
        await executeSQL(scriptPath)
      } else {
        console.log(`⚠️  Script ${script} non trouvé, ignoré`)
      }
    }

    console.log('\n✅ Base de données initialisée avec succès !')
    console.log('\n📊 Résumé des tables créées :')
    console.log('- removal_requests (demandes d\'enlèvement)')
    console.log('- admin_users (utilisateurs administrateurs)')
    console.log('- intervention_zones (zones d\'intervention)')
    console.log('- vehicle_types (types de véhicules)')
    console.log('- pickup_schedules (planning des enlèvements)')
    console.log('- contacts (contacts/prospects)')
    console.log('- testimonials (témoignages clients)')
    console.log('- site_statistics (statistiques du site)')
    console.log('- system_settings (paramètres système)')
    console.log('\n🔧 Bucket de stockage : vehicle-photos')
    console.log('\n🔐 Politiques RLS configurées pour toutes les tables')

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation :', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Fonction pour vérifier la structure de la base
async function checkDatabaseStructure() {
  try {
    console.log('\n🔍 Vérification de la structure de la base de données...\n')

    // Vérifier les tables
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `
    const tablesResult = await pool.query(tablesQuery)
    
    console.log('📋 Tables présentes :')
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })

    // Vérifier les buckets de stockage
    const bucketsQuery = `
      SELECT name 
      FROM storage.buckets 
      ORDER BY name;
    `
    try {
      const bucketsResult = await pool.query(bucketsQuery)
      console.log('\n🗂️  Buckets de stockage :')
      bucketsResult.rows.forEach(row => {
        console.log(`  - ${row.name}`)
      })
    } catch (error) {
      console.log('\n⚠️  Impossible de vérifier les buckets de stockage (normal si pas Supabase)')
    }

    // Compter les enregistrements dans les tables principales
    const counts = await Promise.all([
      pool.query('SELECT COUNT(*) FROM removal_requests'),
      pool.query('SELECT COUNT(*) FROM admin_users'),
      pool.query('SELECT COUNT(*) FROM intervention_zones'),
      pool.query('SELECT COUNT(*) FROM vehicle_types'),
      pool.query('SELECT COUNT(*) FROM system_settings'),
      pool.query('SELECT COUNT(*) FROM testimonials')
    ])

    console.log('\n📊 Nombre d\'enregistrements :')
    console.log(`  - Demandes d'enlèvement : ${counts[0].rows[0].count}`)
    console.log(`  - Utilisateurs admin : ${counts[1].rows[0].count}`)
    console.log(`  - Zones d'intervention : ${counts[2].rows[0].count}`)
    console.log(`  - Types de véhicules : ${counts[3].rows[0].count}`)
    console.log(`  - Paramètres système : ${counts[4].rows[0].count}`)
    console.log(`  - Témoignages : ${counts[5].rows[0].count}`)

  } catch (error) {
    console.error('❌ Erreur lors de la vérification :', error.message)
  }
}

// Gestion des arguments de ligne de commande
const command = process.argv[2]

if (command === 'check') {
  checkDatabaseStructure().then(() => pool.end())
} else if (command === 'init') {
  initCompleteDatabase()
} else {
  console.log('Usage:')
  console.log('  node init-complete-db.js init   - Initialiser la base de données')
  console.log('  node init-complete-db.js check  - Vérifier la structure existante')
  process.exit(1)
}