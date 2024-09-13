import {
  DynamicModule,
  Module,
  Provider,
  ValidationPipe,
} from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app-config';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { HeaderResolver, I18nModule, I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { ValidationI18nPipe } from './commons/pipes/validation-I18n-pipe';
import { DBValidationPipe } from './commons/slices/DBValidation';

const envFilePath = process.env.NODE_ENV;

const providers: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  {
    provide: APP_PIPE,
    useFactory: (
      i18n: I18nService,
      configService: ConfigService,
      prismaService: PrismaService,
      reflector: Reflector,
    ) => {
      return [
        new ValidationPipe({
          disableErrorMessages: false,
          whitelist: true,
          transform: true,
        }),
        new DBValidationPipe(prismaService, reflector),
        new ValidationI18nPipe(i18n),
      ];
    },
    inject: [I18nService, ConfigService, PrismaService, Reflector],
  },
];

const globalModules: DynamicModule[] = [
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
    resolvers: [new HeaderResolver(['x-lang'])],
  }),
  PrismaModule.forRoot({
    isGlobal: true,
  }),
  HttpModule.register({}),
];

@Module({
  imports: [...globalModules],
  providers: [...providers],
})
export class AppModule {}
