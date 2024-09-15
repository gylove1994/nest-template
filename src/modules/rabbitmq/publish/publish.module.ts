import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PublishService } from './publish.service';
import rabbitmqConfig from '@/configs/rabbitmq-config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, rabbitmqConfig.asProvider()),
  ],
  providers: [PublishService],
  exports: [PublishService],
})
export class PublishModule {}
