import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from '@/commons/dtos/pagination.dto';
import { CreatePermissionDto } from './create-permission.dto';

export const CreatePermissionDtoFilterType = PartialType(
  OmitType(CreatePermissionDto, ['description'] as const),
);

export class PaginationPermissionDto extends IntersectionType(
  PaginationDto,
  CreatePermissionDtoFilterType,
) {}
