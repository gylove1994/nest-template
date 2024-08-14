import { IsUUIDsALLInDataBase } from '@/commons/decorators/all-in-db.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ApiPermissionIdExistDto {
  @IsUUID()
  @IsUUIDsALLInDataBase('apiPermission')
  @ApiProperty({
    description: 'API权限ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}
