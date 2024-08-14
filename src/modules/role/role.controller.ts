import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationRoleDto } from './dto/pagination-role.dto';
import { RoleIdExistDto } from './dto/role-id-exist.dto';
import { UserIdExistDto } from '../user/dto/user-id-exist.dto';
import { SuccessOperationResponse } from '@/commons/types/success-operation.types';
import { Role } from '@/_gen/prisma-class/role';
import { PaginationRoleResponse } from './types/pagination-role.types';

@ApiTags('角色管理')
@Controller('role')
@ApiBearerAuth()
@ApiExtraModels(SuccessOperationResponse, PaginationRoleResponse)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  @ApiOkResponse({ type: Role })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('list')
  @ApiOperation({ summary: '获取所有角色' })
  @ApiOkResponse({ type: PaginationRoleResponse })
  findAll(@Body() paginationDto: PaginationRoleDto) {
    return this.roleService.findAll(paginationDto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个角色' })
  @ApiOkResponse({ type: Role })
  findOne(@Query() dto: UserIdExistDto) {
    return this.roleService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色' })
  @ApiOkResponse({ type: Role })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto.id, updateRoleDto);
  }

  @Post('remove')
  @ApiOperation({ summary: '删除角色' })
  @ApiOkResponse({ type: SuccessOperationResponse })
  remove(@Body() dto: RoleIdExistDto) {
    return this.roleService.remove(dto.id);
  }
}
