import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/commons/dtos/pagination.dto';

export class PaginationRoleDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsBoolean()
  all?: boolean;
}
