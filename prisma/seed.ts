import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
export async function seed(prisma: PrismaClient) {
  const hash = async (str: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(str, salt);
  };
  const hashPass = await hash('Aa123456');
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

  await prisma.user.create({
    data: {
      email: 'admin@qq.com',
      password: hashPass,
      role: {
        connect: {
          name: 'admin',
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@qq.com',
      password: hashPass,
      role: {
        connect: {
          name: 'user',
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'guest@qq.com',
      password: hashPass,
      role: {
        connect: {
          name: 'guest',
        },
      },
    },
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
