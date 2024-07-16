import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { bootstrap } from '@/main';
import { syncRoute } from '@/utils/sync-route';
import * as request from 'supertest';
import { randomBytes } from 'crypto';

export class TestHelper {
  private moduleRef: TestingModule;
  public app: NestExpressApplication;
  public prismaClient: PrismaClient;
  cleanUpCallbacks: Array<() => Promise<void>> = [];

  constructor(
    mockProviders: Array<{
      overrideProvider: any;
      useClass: any;
    }> = [],
  ) {
    this.prismaClient = new PrismaClient();

    beforeAll(async () => {
      const moduleRefBake = Test.createTestingModule({
        imports: [AppModule],
      });

      for (const provider of mockProviders) {
        moduleRefBake
          .overrideProvider(provider.overrideProvider)
          .useClass(provider.useClass);
      }

      this.moduleRef = await moduleRefBake.compile();

      const server = await this.moduleRef
        .createNestApplication<NestExpressApplication>()
        .init();
      this.app = await bootstrap(server);
      try {
        await syncRoute(this.app);
      } catch (e) {
        // console.error(e);
      }
    });

    afterEach(async () => {
      for (const callback of this.cleanUpCallbacks.reverse()) {
        await callback();
      }
      this.cleanUpCallbacks = [];
    });

    afterAll(async () => {
      await this.app.close();
      await this.prismaClient.$disconnect();
      await this.moduleRef.close();

      for (const callback of this.cleanUpCallbacks.reverse()) {
        await callback();
      }
      this.cleanUpCallbacks = [];
    });

    return this;
  }

  get request() {
    return request(this.app.getHttpServer());
  }

  async genUser({
    email,
    pass,
    role,
  }: {
    email: string;
    pass: string;
    role: string;
  }) {
    const user = await this.prismaClient.user.create({
      data: {
        email,
        password: pass,
        role: {
          connect: {
            name: role,
          },
        },
      },
    });
    this.cleanUpCallbacks.push(async () => {
      await this.prismaClient.user.delete({
        where: {
          id: user.id,
        },
      });
    });
    return user;
  }

  async genToken(role: string) {
    const user = await this.prismaClient.user.findFirst({
      where: {
        role: {
          name: role,
        },
      },
      include: {
        role: true,
      },
    });

    const res = await this.prismaClient.session.create({
      data: {
        token: randomBytes(32).toString('hex'),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    this.cleanUpCallbacks.push(async () => {
      try {
        await this.prismaClient.session.delete({
          where: {
            id: res.id,
          },
        });
      } catch (e) {}
    });

    return res.token;
  }
}
