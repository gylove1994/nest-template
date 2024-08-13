import { Module, ValidationPipe } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IamModule } from './modules/iam/iam.module';
import appConfig from './configs/app-config';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './modules/user/user.module';
import { ApiPermissionModule } from './modules/api-permission/api-permission.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { I18nModule, I18nService } from 'nestjs-i18n';
import path from 'path';
import { ValidationI18nPipe } from './commons/pipes/validation-I18n-pipe';

const envFilePath = process.env.NODE_ENV;
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV == 'development',
      port: 6000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: `.env.${envFilePath ?? 'production'}`,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'zh_CN',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
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
    {
      provide: APP_PIPE,
      useFactory: (i18n: I18nService, configService: ConfigService) => {
        return [
          new ValidationPipe({
            disableErrorMessages: configService.get('env') === 'production',
            whitelist: true,
            transform: true,
          }),
          new ValidationI18nPipe(i18n),
        ];
      },
      inject: [I18nService, ConfigService],
    },
  ],
})
export class AppModule {}
