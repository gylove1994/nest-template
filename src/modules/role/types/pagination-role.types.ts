import { Role } from '@/_gen/prisma-class/role';
import { ListResult } from '@/commons/types/list-result.types';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationRoleResponse extends ListResult<Role> {
  @ApiProperty({ type: Role, isArray: true })
  data: Role[];
}
