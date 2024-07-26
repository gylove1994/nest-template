import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsUUID } from 'class-validator';

export class ApiPermissionIdExistDto {
  @IsUUID()
  @IsUUIDsALLInDataBase('apiPermission')
  id: string;
}
