import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { User } from '@/_gen/prisma-class/user';
import { PaginationDto } from '@/commons/dtos/pagination.dto';

export class PaginationUserDto extends PaginationDto {
  @ValidateNested()
  @Type(() => PickType(User, ['id', 'email', 'name', 'status']))
  @IsOptional()
  @ApiProperty({
    description: '过滤条件',
    type: PickType(User, ['id', 'email', 'name', 'status']),
  })
  filter?: Pick<User, 'id' | 'email' | 'name' | 'status' | 'roleId'>;
}
