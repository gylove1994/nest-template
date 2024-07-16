import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Role } from '@/_gen/prisma-class/role';
import { PaginationDto } from '@/commons/dtos/pagination.dto';

export class PaginationRoleDto extends PaginationDto<Pick<Role, 'name'>> {
  @ValidateNested()
  @Type(() => PickType(Role, ['name']))
  @IsOptional()
  filter?: Pick<Role, 'name'>;

  @IsOptional()
  @IsBoolean()
  all?: boolean;
}
