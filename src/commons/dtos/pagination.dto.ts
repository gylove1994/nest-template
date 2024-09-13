import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export type WhereType =
  | 'in'
  | 'contains'
  | 'eq'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'sin';

export type ModType = 'and' | 'or';

export type WhereTypeOptions<T> = {
  type: WhereType;
  // 用于映射字段
  mapper?: keyof T;
  // 默认是 or
  mode?: ModType;
};

export interface BuildWhereOptions<K, T> {
  props: {
    [key in keyof Partial<Omit<K, keyof PaginationDto>>]: WhereTypeOptions<T>;
  };
  withDeleted?: boolean | keyof Omit<K, keyof PaginationDto>;
}

export class PaginationDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @ApiProperty({
    description: '分页页码',
  })
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Max(100)
  @Min(5)
  @IsInt()
  @ApiProperty({
    description: '分页大小(5, 10, 20, 50, 100)',
  })
  @Transform(({ value }) => Number(value))
  pageSize: number;
}
