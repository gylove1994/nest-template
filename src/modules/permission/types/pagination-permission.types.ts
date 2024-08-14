import { Permission } from '@/_gen/prisma-class/permission';
import { ListResult } from '@/commons/types/list-result.types';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationPermissionResponse extends ListResult<Permission> {
  @ApiProperty({ type: Permission, isArray: true })
  data: Permission[];
}
