import { User } from './user';
import { Permission } from './permission';
import { ApiPermission } from './api_permission';
import { RoleStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Role {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ isArray: true, type: () => User })
  user: User[];

  @ApiProperty({ isArray: true, type: () => Permission })
  permissions: Permission[];

  @ApiProperty({ isArray: true, type: () => ApiPermission })
  apiPermissions: ApiPermission[];

  @ApiProperty({ enum: RoleStatus, enumName: 'RoleStatus' })
  status: RoleStatus = RoleStatus.ACTIVE;

  @ApiProperty({ type: Boolean })
  deletable: boolean = true;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;
}
