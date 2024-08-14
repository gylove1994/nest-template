import { PaginationDto } from '@/commons/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class PaginationApiPermissionDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'API权限名称必须是字符串' })
  @ApiProperty({
    description: 'API权限名称',
    required: false,
    example: '用户管理',
  })
  name?: string;

  @IsOptional()
  @IsArray({ message: '角色ID列表必须是数组' })
  @ArrayMinSize(1, { message: '角色ID列表至少需要1个元素' })
  @ArrayMaxSize(100, { message: '角色ID列表最多允许100个元素' })
  @IsString({ each: true, message: '角色ID必须是字符串' })
  @ApiProperty({
    description: '角色ID列表',
    required: false,
    type: String,
    isArray: true,
    minItems: 1,
    maxItems: 100,
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  roleIds?: string[];

  @IsOptional()
  @IsArray({ message: '权限组ID列表必须是数组' })
  @ArrayMinSize(1, { message: '权限组ID列表至少需要1个元素' })
  @ArrayMaxSize(100, { message: '权限组ID列表最多允许100个元素' })
  @IsString({ each: true, message: '权限组ID必须是字符串' })
  @ApiProperty({
    description: '权限组ID列表',
    required: false,
    type: String,
    isArray: true,
    minItems: 1,
    maxItems: 100,
    example: [
      '323e4567-e89b-12d3-a456-426614174002',
      '423e4567-e89b-12d3-a456-426614174003',
    ],
  })
  permissionGroupIds?: string[];
}
