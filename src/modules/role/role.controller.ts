import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationRoleDto } from './dto/pagination-role.dto';
import { RoleIdExistDto } from './dto/role-id-exist.dto';
import { UserIdExistDto } from '../user/dto/user-id-exist.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('list')
  @ApiOperation({ summary: '获取所有角色' })
  findAll(@Body() paginationDto: PaginationRoleDto) {
    return this.roleService.findAll(paginationDto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个角色' })
  findOne(@Query() dto: UserIdExistDto) {
    return this.roleService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新角色' })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto.id, updateRoleDto);
  }

  @Post('remove')
  @ApiOperation({ summary: '删除角色' })
  remove(@Body() dto: RoleIdExistDto) {
    return this.roleService.remove(dto.id);
  }
}
