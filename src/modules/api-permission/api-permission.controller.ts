import { PaginationApiPermissionDto } from './dto/pagination-api-permission.dto';
import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { ApiPermissionService } from './api-permission.service';

import { UpdateApiPermissionDto } from './dto/update-api-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPermissionIdExistDto } from './dto/api-permission-id-exist.dto';

@ApiTags('api权限管理')
@Controller('api-permission')
export class ApiPermissionController {
  constructor(private readonly apiPermissionService: ApiPermissionService) {}

  @Post('list')
  @ApiOperation({ summary: '获取所有api权限' })
  findAll(@Body() paginationDto: PaginationApiPermissionDto) {
    return this.apiPermissionService.findAll(paginationDto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个api权限' })
  findOne(@Query() dto: ApiPermissionIdExistDto) {
    return this.apiPermissionService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新api权限' })
  update(@Body() updateApiPermissionDto: UpdateApiPermissionDto) {
    return this.apiPermissionService.update(updateApiPermissionDto);
  }
}
