const { Pool } = require('pg');

async function verifySetup() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://ka_user:password@localhost:5432/ka_auto_epaves'
  });

  try {
    console.log('🔍 Vérification de la configuration PostgreSQL...');
    
    // Test connexion
    const client = await pool.connect();
    console.log('✅ Connexion PostgreSQL réussie');
    
    // Vérifier les tables
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Tables trouvées:', tables.rows.map(r => r.table_name));
    
    // Vérifier admin user
    const adminCheck = await client.query('SELECT * FROM admin_users LIMIT 1');
    console.log('👤 Utilisateur admin:', adminCheck.rows.length > 0 ? 'Configuré' : 'Non trouvé');
    
    client.release();
    console.log('🎉 Configuration PostgreSQL vérifiée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await pool.end();
  }
}

verifySetup();