const envMod = process.env.NODE_ENV ?? 'development';

export const constant = {
  MQ_OPTIONS: {
    EXCHANGE_NAME: `app-exchange-name-${envMod}`,
  },
};
