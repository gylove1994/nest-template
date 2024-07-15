import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IamModule } from '../iam/iam.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [IamModule],
})
export class UserModule {}
