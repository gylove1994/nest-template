import { ApiProperty } from '@nestjs/swagger';

export class ListResultVo<T = any> {
  @ApiProperty({ type: Number, description: '总数' })
  total: number;

  @ApiProperty({ type: Number, description: '页码' })
  page: number;

  @ApiProperty({ type: Number, description: '每页大小' })
  pageSize: number;

  @ApiProperty({ type: Array, description: '数据' })
  data: T[];

  constructor(data: T[], total: number, page: number, pageSize: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
  }
}
