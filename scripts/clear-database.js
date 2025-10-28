const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ka_auto_epaves',
  password: 'test123',
  port: 5432,
});

async function clearDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🗑️  Suppression de toutes les tables...');
    
    // Désactiver les contraintes de clés étrangères temporairement
    await client.query('SET session_replication_role = replica;');
    
    // Obtenir toutes les tables
    const tablesResult = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    // Supprimer chaque table
    for (const row of tablesResult.rows) {
      const tableName = row.tablename;
      console.log(`Suppression de la table: ${tableName}`);
      await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE;`);
    }
    
    // Supprimer toutes les séquences
    const sequencesResult = await client.query(`
      SELECT sequence_name 
      FROM information_schema.sequences 
      WHERE sequence_schema = 'public'
    `);
    
    for (const row of sequencesResult.rows) {
      const sequenceName = row.sequence_name;
      console.log(`Suppression de la séquence: ${sequenceName}`);
      await client.query(`DROP SEQUENCE IF EXISTS "${sequenceName}" CASCADE;`);
    }
    
    // Supprimer toutes les fonctions personnalisées
    const functionsResult = await client.query(`
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' AND routine_type = 'FUNCTION'
    `);
    
    for (const row of functionsResult.rows) {
      const functionName = row.routine_name;
      console.log(`Suppression de la fonction: ${functionName}`);
      await client.query(`DROP FUNCTION IF EXISTS "${functionName}" CASCADE;`);
    }
    
    // Réactiver les contraintes
    await client.query('SET session_replication_role = DEFAULT;');
    
    console.log('✅ Base de données complètement vidée !');
    console.log('📊 Vérification...');
    
    // Vérifier qu'il ne reste plus de tables
    const remainingTables = await client.query(`
      SELECT COUNT(*) as count 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    console.log(`Tables restantes: ${remainingTables.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

clearDatabase();