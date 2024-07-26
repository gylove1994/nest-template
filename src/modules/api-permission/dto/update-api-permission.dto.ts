import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { ApiPermissionIdExistDto } from './api-permission-id-exist.dto';

export class UpdateApiPermissionDto extends ApiPermissionIdExistDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsUUIDsALLInDataBase('role')
  roleIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionGroupIds?: string[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
