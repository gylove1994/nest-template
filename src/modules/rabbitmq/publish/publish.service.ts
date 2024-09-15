import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { constant } from '@/configs/constants/constant';

@Injectable()
export class PublishService {
  constructor(private readonly amqp: AmqpConnection) {}

  /**
   * rabbitmq发送消息
   * @param message
   */
  async pubMQMsg(routingKey: string, message: object): Promise<void> {
    await this.amqp.publish(
      constant.MQ_OPTIONS.EXCHANGE_NAME,
      routingKey,
      message,
    );
  }
}
