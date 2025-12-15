import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@admin.com',
      password: hash,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Default admin user seeded');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
