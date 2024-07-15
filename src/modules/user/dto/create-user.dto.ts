import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(12)
  @ApiProperty({
    description: '用户名',
    maxLength: 12,
  })
  name?: string;

  @IsString()
  @MaxLength(18)
  @MinLength(8)
  @ApiProperty({
    description: '密码',
    maxLength: 18,
    minLength: 8,
  })
  password: string;

  @IsEmail()
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  @ApiProperty({
    description: '手机号',
  })
  phone?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: '头像',
  })
  avatar?: string;

  @IsOptional()
  @IsEnum($Enums.UserStatus)
  @ApiProperty({
    description: '用户状态',
    enum: $Enums.UserStatus,
  })
  status?: $Enums.UserStatus;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: '角色id',
  })
  roleId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: '个人简介',
    maxLength: 100,
  })
  bio?: string;
}
