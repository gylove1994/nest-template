import { Prisma, PrismaClient } from '@prisma/client';
import { PaginationDto } from '../dtos/pagination.dto';
import { ListResultVo } from '../vos/list-result.vo';

export abstract class BasicBo<T> {
  constructor(protected dto: T) {}

  abstract toQo(): any;
}

export abstract class BasicPaginationBo<
  T extends PaginationDto,
  K,
> extends BasicBo<T> {
  constructor(
    dto: T,
    protected prisma: PrismaClient,
    protected model: Prisma.ModelName,
  ) {
    super(dto);
  }

  toSkipAndTake() {
    return {
      skip: (this.dto.page - 1) * this.dto.pageSize,
      take: this.dto.pageSize,
    };
  }

  abstract toQo(): Prisma.Args<K, 'findMany'>;

  async buildResponseVo() {
    const qo = this.toQo();
    const data = await this.prisma[this.model].findMany(qo);
    const total = await this.prisma[this.model].count({ where: qo.where });
    return new ListResultVo(data, total, this.dto.page, this.dto.pageSize);
  }
}
