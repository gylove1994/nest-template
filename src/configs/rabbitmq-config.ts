import {
  MessageHandlerErrorBehavior,
  RabbitMQConfig,
} from '@golevelup/nestjs-rabbitmq';
import { registerAs } from '@nestjs/config';
import { MqExchangeTypeEnum } from './enums/MqExchangeType.enum';
import { constant } from '@/configs/constants/constant';

export const RABBITMQ_CONFIG_TOKEN = 'rabbitmq';

export default registerAs(RABBITMQ_CONFIG_TOKEN, () => {
  const username = process.env.RABBITMQ_USERNAME ?? '';
  const password = process.env.RABBITMQ_PASSWORD ?? '';
  const host = process.env.RABBITMQ_HOST ?? '';
  const port = process.env.RABBITMQ_PORT ?? '';
  const vhost = process.env.RABBITMQ_VHOST ?? '';
  const uri = `amqp://${username}:${password}@${host}:${port}/${vhost}?frameMax=0x10000`;
  return {
    exchanges: [
      {
        name: constant.MQ_OPTIONS.EXCHANGE_NAME,
        type: MqExchangeTypeEnum.DIRECT,
        options: { durable: true },
      },
    ],
    uri,
    connectionInitOptions: { wait: false },
    enableDirectReplyTo: false,
    prefetchCount: 300,
    defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.NACK,
  } satisfies RabbitMQConfig;
});
