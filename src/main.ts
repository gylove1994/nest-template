import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_CONFIG_TOKEN, IAppConfig } from './configs/app-config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { syncRoute } from './utils/sync-route';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(APP_CONFIG_TOKEN);
  const config = new DocumentBuilder()
    .setTitle(appConfig.appName)
    .setDescription(appConfig.appDescription)
    .setVersion(appConfig.appVersion)
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: appConfig.env === 'production',
      // whitelist: appConfig.env === 'production',
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('sapi', app, document);
  await app.listen(appConfig.port);
  await syncRoute(app);
  Logger.log(`-------------------------------------`, 'Bootstrap');
  Logger.log(
    `Server running on http://${appConfig.appHost}:${appConfig.port}`,
    'Bootstrap',
  );
  Logger.log(
    `Swagger running on http://${appConfig.appHost}:${appConfig.port}/sapi`,
    'Bootstrap',
  );
  Logger.log(`Environment: ${appConfig.env}`, 'Bootstrap');
  Logger.log(`Version: ${appConfig.appVersion}`, 'Bootstrap');
  Logger.log(`-------------------------------------`, 'Bootstrap');
}

bootstrap();
