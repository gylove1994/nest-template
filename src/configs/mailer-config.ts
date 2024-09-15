import { MailerOptions } from '@nestjs-modules/mailer';
import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
const MAILER_CONFIG_TOKEN = 'mailer';

export default registerAs(
  MAILER_CONFIG_TOKEN,
  () =>
    ({
      transport: {
        host: process.env.MAILER_HOST,
        port: parseInt(process.env.MAILER_PORT, 10),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: '"no-reply" <no-reply@mail.trubo-dev.cn>',
      },
      template: {
        dir: path.join(__dirname, '../assets/mail-templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }) satisfies MailerOptions,
);
