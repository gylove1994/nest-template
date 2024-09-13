import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponseVO<T> {
  @ApiProperty({ description: '状态码', example: 200, type: Number })
  code = 200;
  @ApiProperty({ description: '消息', example: 'ok', type: String })
  message = 'ok';

  abstract data: T;
}
