import { ApiProperty } from '@nestjs/swagger';

export class File {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  originalName: string;

  @ApiProperty({ type: String })
  host: string;

  @ApiProperty({ type: String })
  accessPath: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
