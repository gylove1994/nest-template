import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { User } from 'src/_gen/prisma-class/user';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { PickByArray } from 'src/utils/omit-by-array';

export class PaginationUserDto extends PaginationDto<
  PickByArray<User, ['id', 'email', 'name', 'status', 'roleId']>
> {
  @ValidateNested()
  @Type(() => PickType(User, ['id', 'email', 'name', 'status']))
  @IsOptional()
  @ApiProperty({
    description: '过滤条件',
    type: PickType(User, ['id', 'email', 'name', 'status']),
  })
  filter?: PickByArray<User, ['id', 'email', 'name', 'status', 'roleId']>;
}
