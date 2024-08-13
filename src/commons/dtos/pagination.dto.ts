import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { cloneDeep } from 'lodash';

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
  mapper?: keyof T;
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

  toSkipAndTake() {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
    };
  }

  buildWhere<K = any>(options: BuildWhereOptions<this, K>) {
    let where: any = {};
    const paginationValue = this.getPaginationValue();
    const ands: any[] = Object.keys(options.props)
      .filter((key) => {
        return options.props[key].mode === 'and';
      })
      .map((key) =>
        this.whereBuilder(options.props[key], key, paginationValue[key]),
      );
    const ors: any[] = Object.keys(options.props)
      .filter((key) => {
        return options.props[key].mode === 'or';
      })
      .map((key) =>
        this.whereBuilder(options.props[key], key, paginationValue[key]),
      );
    where.OR = ors;
    where = { ...where, ...ands };
    if (options.withDeleted) {
      if (typeof options.withDeleted === 'boolean') {
        where.deleted = options.withDeleted;
      } else {
        where.deleted = {
          eq: paginationValue[options.withDeleted],
        };
      }
    }
    return where;
  }

  buildResponse<T>(data: T[], total: number) {
    return {
      data,
      total,
      page: this.page,
      pageSize: this.pageSize,
    };
  }

  private whereBuilder<T>(wto: WhereTypeOptions<T>, key: string, value: any) {
    switch (wto.type) {
      case 'in':
        return {
          [wto.mapper ?? key]: {
            in: value,
          },
        };
      case 'contains':
        return {
          [wto.mapper ?? key]: {
            contains: value,
          },
        };
      case 'eq':
        return {
          [wto.mapper ?? key]: value,
        };
      case 'lt':
        return {
          [wto.mapper ?? key]: {
            lt: value,
          },
        };
      case 'lte':
        return {
          [wto.mapper ?? key]: {
            lte: value,
          },
        };
      case 'gt':
        return {
          [wto.mapper ?? key]: {
            gt: value,
          },
        };
      case 'gte':
        return {
          [wto.mapper ?? key]: {
            gte: value,
          },
        };
      case 'sin':
        return {
          [wto.mapper ?? key]: {
            some: {
              id: {
                in: value,
              },
            },
          },
        };
    }
  }

  private getPaginationValue() {
    const clone = cloneDeep(this);
    for (const key in PaginationDto.templatePaginationDtoInstance) {
      if (PaginationDto.templatePaginationDtoInstance.hasOwnProperty(key)) {
        delete clone[key];
      }
    }
    return clone as Omit<this, keyof PaginationDto>;
  }

  // type space to value space
  static readonly templatePaginationDtoInstance = new PaginationDto();
}
