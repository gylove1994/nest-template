import { ApiProperty } from '@nestjs/swagger';

export class SuccessOperationResponse {
  @ApiProperty({ enum: ['success'] })
  message: string;
}
