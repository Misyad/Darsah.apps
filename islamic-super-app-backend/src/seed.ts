import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'premium@example.com' },
    update: {},
    create: {
      email: 'premium@example.com',
      name: 'Hasan Premium',
      password: 'hashed_password_123',
      isPremium: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'free@example.com' },
    update: {},
    create: {
      email: 'free@example.com',
      name: 'User Gratis',
      password: 'hashed_password_123',
      isPremium: false,
    },
  });

  // 2. Add Reading History for user1
  await prisma.readingHistory.create({
    data: {
      userId: user1.id,
      surahId: 36, // Ya-Sin
      ayahId: 10,
    },
  });

  // 3. Add Donation Logs
  await prisma.donationLog.createMany({
    data: [
      {
        userId: user1.id,
        amount: 50000,
        paymentMethod: 'QRIS',
        status: 'SUCCESS',
      },
      {
        userId: user1.id,
        amount: 25000,
        paymentMethod: 'Virtual Account',
        status: 'PENDING',
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
