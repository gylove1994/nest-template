import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { PermissionIdExistDto } from './permission-id-exist.dto';

export class UpdatePermissionDto extends IntersectionType(
  PermissionIdExistDto,
  PartialType(CreatePermissionDto),
) {}
