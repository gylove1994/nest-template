import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';

export class UpdateApiPermissionDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionGroupIds?: string[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
