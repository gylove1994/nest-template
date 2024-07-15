import { Profile } from './profile';
import { Session } from './session';
import { Role } from './role';
import { OperationLog } from './operation_log';
import { UserStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ enum: UserStatus, enumName: 'UserStatus' })
  status: UserStatus = UserStatus.ACTIVE;

  @ApiPropertyOptional({ type: () => Profile })
  profile?: Profile;

  @ApiProperty({ isArray: true, type: () => Session })
  session: Session[];

  @ApiProperty({ type: () => Role })
  role: Role;

  @ApiProperty({ type: String })
  roleId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;

  @ApiProperty({ isArray: true, type: () => OperationLog })
  operationLog: OperationLog[];
}
