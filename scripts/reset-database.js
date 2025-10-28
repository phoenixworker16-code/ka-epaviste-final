const { Pool } = require('pg');

// Configuration pour se connecter à PostgreSQL (base par défaut)
const defaultPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test123',
  port: 5432,
});

async function resetDatabase() {
  console.log('🔄 Réinitialisation complète de la base de données...');
  
  // Étape 1: Supprimer la base de données si elle existe
  const defaultClient = await defaultPool.connect();
  
  try {
    // Terminer toutes les connexions actives à la base de données
    await defaultClient.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = 'ka_auto_epaves' AND pid <> pg_backend_pid()
    `);
    
    // Supprimer la base de données
    await defaultClient.query('DROP DATABASE IF EXISTS ka_auto_epaves');
    console.log('🗑️  Base de données supprimée');
    
    // Créer une nouvelle base de données
    await defaultClient.query('CREATE DATABASE ka_auto_epaves');
    console.log('✅ Nouvelle base de données créée');
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
  } finally {
    defaultClient.release();
    await defaultPool.end();
  }
  
  console.log('🎉 Base de données complètement réinitialisée !');
  console.log('💡 Vous pouvez maintenant exécuter: node scripts/init-db.js');
}

resetDatabase();