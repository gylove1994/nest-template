import { CacheModuleOptions } from '@nestjs/cache-manager';
import { registerAs } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisOptions } from 'ioredis';

export const CACHE_CONFIG_TOKEN = 'cache';

export default registerAs(
  CACHE_CONFIG_TOKEN,
  () =>
    ({
      host: process.env.REDIS_HOST ?? '',
      port: parseInt(process.env.REDIS_PORT, 10) ?? 6379,
      password: process.env.REDIS_PASSWORD ?? '',
      isGlobal: true,
      store: redisStore,
    }) satisfies CacheModuleOptions<RedisOptions>,
);
