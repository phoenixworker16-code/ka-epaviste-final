const { Pool } = require('pg')

const passwords = ['admin', 'password', 'postgres', '123456', 'root', '']

async function testConnection(password) {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: password,
    port: 5432,
  })

  try {
    const client = await pool.connect()
    console.log(`✅ Connexion réussie avec le mot de passe: "${password}"`)
    client.release()
    await pool.end()
    return true
  } catch (error) {
    console.log(`❌ Échec avec le mot de passe: "${password}"`)
    await pool.end()
    return false
  }
}

async function findCorrectPassword() {
  console.log('Test des mots de passe PostgreSQL courants...\n')
  
  for (const password of passwords) {
    const success = await testConnection(password)
    if (success) {
      console.log(`\n🎉 Mot de passe trouvé: "${password}"`)
      console.log(`Mets à jour ton .env.local avec: DB_PASSWORD=${password}`)
      return
    }
  }
  
  console.log('\n❌ Aucun mot de passe trouvé. Vérifiez votre installation PostgreSQL.')
  console.log('Vous pouvez réinitialiser le mot de passe avec:')
  console.log('psql -U postgres -c "ALTER USER postgres PASSWORD \'nouveaumotdepasse\';"')
}

findCorrectPassword().catch(console.error)