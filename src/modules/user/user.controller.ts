import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UserIdExistDto } from './dto/user-id-exist.dto';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('list')
  @ApiOperation({ summary: '获取所有用户' })
  findAll(@Body() paginationDto: PaginationUserDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取单个用户' })
  findOne(@Query() dto: UserIdExistDto) {
    return this.userService.findOne(dto.id);
  }

  @Post('update')
  @ApiOperation({ summary: '更新用户' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Post('remove')
  @ApiOperation({ summary: '删除用户' })
  remove(@Body() dto: UserIdExistDto) {
    return this.userService.remove(dto.id);
  }
}
