import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  permissionIds: string[];

  @IsUUID('4', { each: true })
  @IsOptional()
  apiPermissionIds: string[];
}
