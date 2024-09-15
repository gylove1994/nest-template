import { registerAs } from '@nestjs/config';
import _ from 'lodash';
import { type Params } from 'nestjs-pino';

export const LOGGER_CONFIG_TOKEN = 'LOGGER_CONFIG_TOKEN';

export default registerAs(LOGGER_CONFIG_TOKEN, () => {
  return getLoggerConfig() satisfies Params;
});

const getLoggerConfig = (): Params => {
  if (process.env.NODE_ENV === 'development') {
    return {
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    };
  } else if (process.env.NODE_ENV === 'test') {
    // disable logger in test environment
    return {
      pinoHttp: {
        transport: {
          target: 'pino/file',
          options: { destination: '/dev/null' },
        },
      },
    };
  } else
    return {
      pinoHttp: {
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          } else if (res.statusCode >= 500 || !_.isNil(err)) {
            return 'error';
          }
          return 'info';
        },
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.raw.body,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.raw.body,
          }),
          err: (err) => ({
            type: err.type,
            message: err.message,
            stack: err.stack,
          }),
        },
      },
    };
};
