import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';

@Module({
  providers: [SubscribeService],
})
export class SubscribeModule {}
