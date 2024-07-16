import { PaginationDto } from '@/commons/dtos/pagination.dto';

export class PaginationApiPermissionDto extends PaginationDto<any> {
  filter?: any;
}
