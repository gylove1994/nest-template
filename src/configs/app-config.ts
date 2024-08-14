import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  port: number;
  env: string;
  appName: string;
  appDescription: string;
  appVersion: string;
  appHost: string;
}

export const APP_CONFIG_TOKEN = 'app';

export default registerAs(APP_CONFIG_TOKEN, () => {
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'NestJS App',
    appDescription: process.env.APP_DESCRIPTION || 'NestJS App Description',
    appVersion: process.env.APP_VERSION || '1.0.0',
    appHost: process.env.APP_HOST || 'localhost',
  } satisfies IAppConfig;
});
