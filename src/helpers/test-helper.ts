import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { bootstrap } from '@/main';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

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
        providers: [
          {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
              whitelist: true,
              transform: true,
            }),
          },
        ],
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
}
