const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Supprimer l'admin existant s'il existe
    await prisma.adminUser.deleteMany({
      where: { email: 'admin@ka-autoepaves.fr' }
    })

    // Créer le hash du mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Créer le nouvel admin
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@ka-autoepaves.fr',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'KA Auto Épaves',
        role: 'super_admin'
      }
    })

    console.log('✅ Admin créé avec succès!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Mot de passe: admin123')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()