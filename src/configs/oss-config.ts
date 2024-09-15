import { registerAs } from '@nestjs/config';
import { NestMinioOptions } from 'nestjs-minio';

export const OSS_CONFIG_TOKEN = 'oss';

export default registerAs(
  OSS_CONFIG_TOKEN,
  () =>
    ({
      accessKey: process.env.OSS_ACCESS_KEY,
      secretKey: process.env.OSS_SECRET_KEY,
      endPoint: process.env.OSS_ENDPOINT,
    }) satisfies NestMinioOptions,
);
