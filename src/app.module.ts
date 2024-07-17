import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './modules/iam/iam.module';
import appConfig from './configs/app-config';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './modules/user/user.module';
import { ApiPermissionModule } from './modules/api-permission/api-permission.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

const envFilePath = process.env.NODE_ENV;
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV == 'development',
      port: 8000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: `.env.${envFilePath ?? 'production'}`,
    }),
    CacheModule.register(),
    IamModule,
    UserModule,
    ApiPermissionModule,
    PermissionModule,
    RoleModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register({}),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
