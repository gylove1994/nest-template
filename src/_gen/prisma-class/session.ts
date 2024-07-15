import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Session {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiProperty({ type: Date })
  expiresAt: Date;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: String })
  userId: string;
}
