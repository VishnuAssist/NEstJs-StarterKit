import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const adminHash = await bcrypt.hash('admin@123', 10);
  const vishnuHash = await bcrypt.hash('Vishnu@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@admin.com',
      password: adminHash,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'vishnu@example.com' },
    update: {},
    create: {
      name: 'Vishnu',
      email: 'vishnu@example.com',
      password: vishnuHash,
      role: Role.EMPLOYEE,
    },
  });

  console.log('✅ Default admin user seeded');
  console.log('✅ Vishnu user seeded');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
