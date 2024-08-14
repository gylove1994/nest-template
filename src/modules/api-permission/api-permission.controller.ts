import { PaginationApiPermissionDto } from './dto/pagination-api-permission.dto';
import { Controller, Get, Body, Post, Query, HttpCode } from '@nestjs/common';
import { ApiPermissionService } from './api-permission.service';

import { UpdateApiPermissionDto } from './dto/update-api-permission.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiExtraModels,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiPermissionIdExistDto } from './dto/api-permission-id-exist.dto';
import { PaginationApiPermissionResponseDto } from './types/pagination-api-permission.type';
import { ApiPermission } from '@/_gen/prisma-class/api_permission';

@ApiTags('api权限管理')
@Controller('api-permission')
@ApiBearerAuth()
@ApiExtraModels(ApiPermission, PaginationApiPermissionResponseDto)
export class ApiPermissionController {
  constructor(private readonly apiPermissionService: ApiPermissionService) {}

  @Get('list')
  @HttpCode(200)
  @ApiOperation({ summary: '获取所有api权限' })
  @ApiOkResponse({ type: PaginationApiPermissionResponseDto })
  findAll(@Query() paginationDto: PaginationApiPermissionDto) {
    return this.apiPermissionService.findAll(paginationDto);
  }

  @Get('detail')
  @HttpCode(200)
  @ApiOperation({ summary: '获取单个api权限' })
  @ApiOkResponse({ type: ApiPermission })
  findOne(@Query() dto: ApiPermissionIdExistDto) {
    return this.apiPermissionService.findOne(dto.id);
  }

  @Post('update')
  @HttpCode(200)
  @ApiOperation({ summary: '更新api权限' })
  @ApiOkResponse({ type: ApiPermission })
  update(@Body() updateApiPermissionDto: UpdateApiPermissionDto) {
    return this.apiPermissionService.update(updateApiPermissionDto);
  }
}
