const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_TLSHa2wiyb4C@ep-morning-night-agizqqi0-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

async function syncDatabase() {
  try {
    console.log('🔄 Synchronisation de la base de données...')
    
    // Vérifier la connexion
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')
    
    // Compter les demandes existantes
    const count = await prisma.removalRequest.count()
    console.log(`📊 Nombre de demandes existantes: ${count}`)
    
    // Test d'insertion
    const testRequest = await prisma.removalRequest.create({
      data: {
        firstName: 'Test',
        lastName: 'Sync',
        email: 'test-sync@example.com',
        phone: '0123456789',
        vehicleBrand: 'Test Brand',
        vehicleModel: 'Test Model',
        vehicleCondition: 'autre',
        address: 'Test Address',
        city: 'Test City',
        postalCode: '12345',
        photoUrls: []
      }
    })
    
    console.log('✅ Test d\'insertion réussi:', testRequest.id)
    
    // Supprimer le test
    await prisma.removalRequest.delete({
      where: { id: testRequest.id }
    })
    
    console.log('✅ Base de données synchronisée et fonctionnelle!')
    
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error)
  } finally {
    await prisma.$disconnect()
  }
}

syncDatabase()