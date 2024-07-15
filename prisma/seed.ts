import { PrismaClient } from '@prisma/client';
export async function seed(prisma: PrismaClient) {
  await prisma.role.createMany({
    data: [
      {
        name: 'admin',
        description: '系统内置角色，不可删除',
        deletable: false,
      },
      {
        name: 'user',
        description: '系统内置角色，不可删除',
        deletable: false,
      },
      {
        name: 'guest',
        description: '系统内置角色，不可删除',
        deletable: false,
      },
    ],
  });
}

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
