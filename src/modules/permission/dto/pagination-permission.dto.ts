import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { CreatePermissionDto } from './create-permission.dto';

export class PaginationPermissionDto extends PaginationDto<
  Partial<Omit<CreatePermissionDto, 'description'>>
> {
  @ValidateNested()
  @Type(() =>
    PartialType(OmitType(CreatePermissionDto, ['description'] as const)),
  )
  @IsOptional()
  @ApiProperty({
    type: () =>
      PartialType(OmitType(CreatePermissionDto, ['description'] as const)),
    description: '过滤条件',
  })
  filter?: Partial<Omit<CreatePermissionDto, 'description'>>;
}
