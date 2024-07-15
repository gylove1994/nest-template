import { ApiPermission } from './api_permission';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiPermissionGroup {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ isArray: true, type: () => ApiPermission })
  permissions: ApiPermission[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;
}
