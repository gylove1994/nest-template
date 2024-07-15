import { PaginationApiPermissionDto } from './dto/pagination-api-permission.dto';
import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ApiPermissionService } from './api-permission.service';

import { UpdateApiPermissionDto } from './dto/update-api-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api权限管理')
@Controller('api-permission')
export class ApiPermissionController {
  constructor(private readonly apiPermissionService: ApiPermissionService) {}

  @Get()
  @ApiOperation({ summary: '获取所有api权限' })
  findAll(@Body() paginationDto: PaginationApiPermissionDto) {
    return this.apiPermissionService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个api权限' })
  findOne(@Param('id') id: string) {
    return this.apiPermissionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新api权限' })
  update(
    @Param('id') id: string,
    @Body() updateApiPermissionDto: UpdateApiPermissionDto,
  ) {
    return this.apiPermissionService.update(id, updateApiPermissionDto);
  }
}
