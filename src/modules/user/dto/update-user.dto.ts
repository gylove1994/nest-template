import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserIdExistDto } from './user-id-exist.dto';

export class UpdateUserDto extends IntersectionType(
  UserIdExistDto,
  PartialType(CreateUserDto),
) {}
