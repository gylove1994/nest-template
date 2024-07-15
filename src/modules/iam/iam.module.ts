import { Module } from '@nestjs/common';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';
import { APP_GUARD } from '@nestjs/core';
import { ApiPermissionGuard } from './guards/api-permission.guard';

@Module({
  controllers: [IamController],
  providers: [
    IamService,
    {
      provide: APP_GUARD,
      useClass: ApiPermissionGuard,
    },
  ],
  exports: [IamService],
})
export class IamModule {}
