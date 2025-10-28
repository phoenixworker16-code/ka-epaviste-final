const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('test@123', 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@ka-autoepaves.fr' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@ka-autoepaves.fr',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'KA Auto',
      role: 'super_admin',
    },
  });

  console.log('✅ Admin créé:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
