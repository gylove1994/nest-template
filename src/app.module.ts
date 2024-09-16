import {
  DynamicModule,
  Module,
  Provider,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app-config';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { HeaderResolver, I18nModule, I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { ValidationI18nPipe } from './commons/pipes/validationI18n.pipe';
import { DBValidationPipe } from './commons/slices/DBValidation';
import { RedisOptions } from 'ioredis';
import cacheConfig from './configs/cache-config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from './configs/mailer-config';
import { NestMinioModule } from 'nestjs-minio';
import ossConfig from './configs/oss-config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './configs/logger-config';
import rabbitmqConfig from './configs/rabbitmq-config';
import { SubscribeModule } from './modules/rabbitmq/subscribe/subscribe.module';
import { PublishModule } from './modules/rabbitmq/publish/publish.module';
import { FileModule } from './modules/file/file.module';

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

const globalModules: Array<DynamicModule | Type<any>> = [
  DevtoolsModule.register({
    http: process.env.NODE_ENV == 'development',
    port: 6000,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [
      appConfig,
      cacheConfig,
      loggerConfig,
      ossConfig,
      mailerConfig,
      rabbitmqConfig,
    ],
    envFilePath: `.env.${envFilePath ?? 'production'}`,
  }),
  CacheModule.registerAsync<RedisOptions>(cacheConfig.asProvider()),
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
  MailerModule.forRootAsync(mailerConfig.asProvider()),
  NestMinioModule.registerAsync(ossConfig.asProvider()),
  LoggerModule.forRootAsync(loggerConfig.asProvider()),
  PublishModule.forRoot(),
  FileModule.forRoot(),
  SubscribeModule,
];

@Module({
  imports: [...globalModules],
  providers: [...providers],
})
export class AppModule {}
