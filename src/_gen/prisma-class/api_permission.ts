import { ApiPermissionGroup } from './api_permission_group';
import { OperationLog } from './operation_log';
import { Role } from './role';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiPermission {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  path: string;

  @ApiProperty({ type: String })
  method: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Boolean })
  isPublic: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => ApiPermissionGroup })
  apiPermissionGroups: ApiPermissionGroup[];

  @ApiProperty({ isArray: true, type: () => OperationLog })
  OperationLogs: OperationLog[];

  @ApiProperty({ isArray: true, type: () => Role })
  roles: Role[];
}
