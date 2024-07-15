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

export type WhereTypeWithMapper<K> = [WhereType, keyof K];

export abstract class PaginationDto<T> {
  @IsNumber()
  @ApiProperty({
    description: '分页页码',
  })
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

  abstract filter?: T;

  toSkipAndTake() {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
    };
  }

  buildWhere<K = any>(props: {
    [key in keyof T]: WhereType | WhereTypeWithMapper<K>;
  }) {
    const where: any = {};
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const value = this.filter[key];
        const [type, mapper] = Array.isArray(props[key])
          ? (props[key] as WhereTypeWithMapper<K>)
          : [props[key] as WhereType, key];
        if (value) {
          switch (type) {
            case 'in':
              where[mapper] = {
                in: value,
              };
              break;
            case 'contains':
              where[mapper] = {
                contains: value,
              };
              break;
            case 'eq':
              where[mapper] = {
                equals: value,
              };
              break;
            case 'lt':
              where[mapper] = {
                lt: value,
              };
              break;
            case 'lte':
              where[mapper] = {
                lte: value,
              };
              break;
            case 'gt':
              where[mapper] = {
                gt: value,
              };
              break;
            case 'gte':
              where[mapper] = {
                gte: value,
              };
              break;
            case 'sin':
              where[mapper] = {
                some: {
                  id: {
                    in: value,
                  },
                },
              };
              break;
          }
        }
      }
    }
    return where;
  }

  buildWhereWithNoDelete<K = any>(props: {
    [key in keyof T]: WhereType | WhereTypeWithMapper<K>;
  }) {
    return {
      ...this.buildWhere(props),
      deletedAt: null,
    };
  }
}
