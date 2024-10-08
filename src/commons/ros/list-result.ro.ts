import { ApiProperty } from '@nestjs/swagger';

export abstract class ListResultRo<T = any> {
  @ApiProperty({ type: Number, description: '总数' })
  total: number;

  @ApiProperty({ type: Number, description: '页码' })
  page: number;

  @ApiProperty({ type: Number, description: '每页大小' })
  pageSize: number;

  abstract data: T[];
}
