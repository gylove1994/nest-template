import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { IsUUIDsALLInDataBase } from '@/commons/pipes/all-in-db.pipe';
import { IsNotSameNameInDataBase } from '@/commons/pipes/not-same-name.pipe';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    description: '权限字符',
    maxLength: 20,
  })
  @IsNotSameNameInDataBase('permission')
  name: string;

  @IsString()
  @MaxLength(50)
  @Optional()
  @ApiProperty({
    description: '权限描述',
    maxLength: 50,
  })
  description?: string;

  @IsUUID('4', { each: true })
  @ApiProperty({
    description: '角色id',
    type: 'array',
    items: {
      type: 'string',
      format: 'uuid',
    },
  })
  @IsOptional()
  @IsUUIDsALLInDataBase('role')
  roleIds?: string[];

  @IsUUID('4', { each: true })
  @ApiProperty({
    description: '权限组id',
    type: 'array',
    items: {
      type: 'string',
      format: 'uuid',
    },
  })
  @IsOptional()
  @IsUUIDsALLInDataBase('permissionGroup')
  permissionGroupIds?: string[];
}
