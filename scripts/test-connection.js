const { Pool } = require('pg');

const passwords = ['admin', 'test123', 'postgres', ''];

async function testConnection() {
  for (const password of passwords) {
    console.log(`🔍 Test avec le mot de passe: "${password}"`);
    
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: password,
      port: 5432,
    });

    try {
      const client = await pool.connect();
      console.log(`✅ Connexion réussie avec le mot de passe: "${password}"`);
      client.release();
      await pool.end();
      return password;
    } catch (error) {
      console.log(`❌ Échec avec le mot de passe: "${password}"`);
    }
  }
  
  console.log('❌ Aucun mot de passe ne fonctionne');
  return null;
}

testConnection();