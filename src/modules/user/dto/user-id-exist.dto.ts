import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { IsUUID } from 'class-validator';

export class UserIdExistDto {
  @IsUUID()
  @IsUUIDsALLInDataBase('user')
  id: string;
}
