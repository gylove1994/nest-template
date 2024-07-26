import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationPermissionDto } from './dto/pagination-permission.dto';
import { PermissionIdExistDto } from './dto/permission-id-exist.dto';

@ApiTags('权限字符管理')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @ApiOperation({ summary: '创建权限字符' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Post('list')
  @ApiOperation({ summary: '获取所有权限字符' })
  findAll(@Body() paginate: PaginationPermissionDto) {
    return this.permissionService.findAll(paginate);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个权限字符' })
  findOne(@Query() dto: PermissionIdExistDto) {
    return this.permissionService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新权限字符' })
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(
      updatePermissionDto.id,
      updatePermissionDto,
    );
  }

  @Post('remove')
  @ApiOperation({ summary: '删除权限字符' })
  remove(@Body() dto: PermissionIdExistDto) {
    return this.permissionService.remove(dto.id);
  }
}
