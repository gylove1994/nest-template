import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsUUID } from 'class-validator';

export class PermissionIdExistDto {
  @IsUUID()
  @IsUUIDsALLInDataBase('permission')
  id: string;
}
