import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from '@/commons/dtos/pagination.dto';
import { CreatePermissionDto } from './create-permission.dto';

export const CreatePermissionDtoFilterType = PartialType(
  OmitType(CreatePermissionDto, ['description'] as const),
);

export class PaginationPermissionDto extends PaginationDto<
  Partial<Omit<CreatePermissionDto, 'description'>>
> {
  @ValidateNested()
  @Type(() => CreatePermissionDtoFilterType)
  @IsOptional()
  @ApiProperty({
    type: CreatePermissionDtoFilterType,
    description: '过滤条件',
    required: false,
  })
  filter?: Partial<Omit<CreatePermissionDto, 'description'>>;
}
