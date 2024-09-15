import { PrismaClient } from '@prisma/client';
export async function seed(_prisma: PrismaClient) {}

if (require.main === module) {
  const prismaClient = new PrismaClient();

  seed(prismaClient)
    .then(async () => {
      await prismaClient.$disconnect();
      // eslint-disable-next-line no-console
      console.log('All records seeded');
    })
    .catch(async (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      await prismaClient.$disconnect();
      process.exit(1);
    });
}
