import { Module } from '@nestjs/common';
import { ApiPermissionService } from './api-permission.service';
import { ApiPermissionController } from './api-permission.controller';

@Module({
  controllers: [ApiPermissionController],
  providers: [ApiPermissionService],
})
export class ApiPermissionModule {}
