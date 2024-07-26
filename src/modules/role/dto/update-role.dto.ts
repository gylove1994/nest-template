import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { RoleIdExistDto } from './role-id-exist.dto';

export class UpdateRoleDto extends IntersectionType(
  RoleIdExistDto,
  PartialType(CreateRoleDto),
) {}
