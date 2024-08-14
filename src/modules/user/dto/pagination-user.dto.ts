import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from '@/commons/dtos/pagination.dto';
import { UserStatus } from '@prisma/client';

export class PaginationUserDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: '用户ID', required: false })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '用户邮箱', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '用户名', required: false })
  name?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({ description: '用户状态', enum: UserStatus, required: false })
  status?: UserStatus;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: '角色ID', required: false })
  roleId?: string;
}
