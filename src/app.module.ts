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

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    IamModule,
    UserModule,
    ApiPermissionModule,
    PermissionModule,
    RoleModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
