import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from '@/commons/dtos/pagination.dto';
import { CreatePermissionDto } from './create-permission.dto';

export const CreatePermissionDtoFilterType = PartialType(
  OmitType(CreatePermissionDto, ['description'] as const),
);

export class PaginationPermissionDto extends IntersectionType(
  PaginationDto,
  CreatePermissionDtoFilterType,
) {}
