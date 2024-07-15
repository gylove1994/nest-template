import { PaginationDto } from 'src/commons/dtos/pagination.dto';

export class PaginationApiPermissionDto extends PaginationDto<any> {
  filter?: any;
}
