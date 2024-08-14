import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PaginationPermissionDto } from './dto/pagination-permission.dto';
import { PermissionIdExistDto } from './dto/permission-id-exist.dto';
import { Permission } from '@/_gen/prisma-class/permission';
import {
  ApiOkResponse,
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginationPermissionResponse } from './types/pagination-permission.types';
import { SuccessOperationResponse } from '@/commons/types/success-operation.types';

@ApiTags('权限字符管理')
@Controller('permission')
@ApiExtraModels(
  Permission,
  PaginationPermissionResponse,
  SuccessOperationResponse,
)
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @ApiOperation({ summary: '创建权限字符' })
  @ApiOkResponse({ type: Permission })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('list')
  @ApiOperation({ summary: '获取所有权限字符' })
  @ApiOkResponse({ type: PaginationPermissionResponse })
  findAll(@Query() paginate: PaginationPermissionDto) {
    return this.permissionService.findAll(paginate);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个权限字符' })
  @ApiOkResponse({ type: Permission })
  findOne(@Query() dto: PermissionIdExistDto) {
    return this.permissionService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新权限字符' })
  @ApiOkResponse({ type: Permission })
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(
      updatePermissionDto.id,
      updatePermissionDto,
    );
  }

  @Post('remove')
  @ApiOperation({ summary: '删除权限字符' })
  @ApiOkResponse({ type: SuccessOperationResponse })
  remove(@Body() dto: PermissionIdExistDto) {
    return this.permissionService.remove(dto.id);
  }
}
