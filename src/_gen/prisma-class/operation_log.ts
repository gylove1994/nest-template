import { User } from './user';
import { ApiPermission } from './api_permission';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OperationLog {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiProperty({ type: () => ApiPermission })
  ApiPermission: ApiPermission;

  @ApiProperty({ type: String })
  apiPermissionId: string;

  @ApiProperty({ type: String })
  data: string;
}
