import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsUUID } from 'class-validator';

export class RoleIdExistDto {
  @IsUUID()
  @IsUUIDsALLInDataBase('role')
  id: string;
}
