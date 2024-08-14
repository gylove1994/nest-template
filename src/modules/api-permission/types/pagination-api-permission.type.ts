import { ApiPermission } from '@/_gen/prisma-class/api_permission';
import { ListResult } from '@/commons/types/list-result.types';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationApiPermissionResponseDto extends ListResult<ApiPermission> {
  @ApiProperty({ type: ApiPermission, isArray: true })
  data: ApiPermission[];
}
