import { Role } from './role';
import { PermissionGroup } from './permission_group';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ isArray: true, type: () => Role })
  roles: Role[];

  @ApiProperty({ isArray: true, type: () => PermissionGroup })
  permissionGroups: PermissionGroup[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;
}
