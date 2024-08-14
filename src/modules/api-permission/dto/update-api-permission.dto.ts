import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { ApiPermissionIdExistDto } from './api-permission-id-exist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApiPermissionDto extends ApiPermissionIdExistDto {
  @IsOptional()
  @IsArray({ message: '角色ID列表必须是数组' })
  @IsString({ each: true, message: '每个角色ID必须是字符串' })
  @IsUUIDsALLInDataBase('role', { message: '所有角色ID必须存在于数据库中' })
  @ApiProperty({
    description: '角色ID列表',
    required: false,
    type: String,
    isArray: true,
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  roleIds?: string[];

  @IsOptional()
  @IsArray({ message: '权限组ID列表必须是数组' })
  @IsString({ each: true, message: '每个权限组ID必须是字符串' })
  @ApiProperty({
    description: '权限组ID列表',
    required: false,
    type: String,
    isArray: true,
    example: [
      '323e4567-e89b-12d3-a456-426614174002',
      '423e4567-e89b-12d3-a456-426614174003',
    ],
  })
  permissionGroupIds?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isPublic必须是布尔值' })
  @ApiProperty({
    description: '是否公开',
    required: false,
    type: Boolean,
    example: true,
  })
  isPublic?: boolean;
}
