const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', password: hashed, name: 'Admin', role: 'admin' }
  });
  console.log('seed done');
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
