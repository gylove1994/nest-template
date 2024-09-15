import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_CONFIG_TOKEN, IAppConfig } from './configs/app-config';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

export async function bootstrap(app: NestExpressApplication) {
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(APP_CONFIG_TOKEN);
  if (appConfig.env !== 'production') {
    app.enableCors();
  }
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  return app;
}

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    bufferLogs: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(APP_CONFIG_TOKEN);
  const config = new DocumentBuilder()
    .setTitle(appConfig.appName)
    .setDescription(appConfig.appDescription)
    .setVersion(appConfig.appVersion)
    .build();
  await bootstrap(app);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('sapi', app, document);
  await app.listen(appConfig.port);
  logger.log(`-------------------------------------`, 'Bootstrap');
  logger.log(
    `Server running on http://${appConfig.appHost}:${appConfig.port}`,
    'Bootstrap',
  );
  logger.log(
    `Swagger running on http://${appConfig.appHost}:${appConfig.port}/sapi`,
    'Bootstrap',
  );
  logger.log(`Environment: ${appConfig.env}`, 'Bootstrap');
  logger.log(`Version: ${appConfig.appVersion}`, 'Bootstrap');
  logger.log(`-------------------------------------`, 'Bootstrap');
}

if (require.main === module) {
  main();
}
