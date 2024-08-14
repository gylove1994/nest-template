import { IamService } from '../iam/iam.service';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly iamService: IamService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }
    const password = await this.iamService.hash(createUserDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password,
        status: createUserDto.status ?? 'ACTIVE',
        role: {
          connect: createUserDto.roleId
            ? { id: createUserDto.roleId }
            : { name: 'user' },
        },
        profile: {
          create: {
            phone: createUserDto.phone,
            bio: createUserDto.bio,
          },
        },
      },
    });
    delete newUser.password;
    return newUser;
  }

  async findAll(dto: PaginationUserDto) {
    const where = dto.buildWhere<PaginationUserDto>({
      props: {
        id: { type: 'contains' },
        email: { type: 'contains' },
        name: { type: 'contains' },
        status: { type: 'eq' },
        roleId: { type: 'eq' },
      },
    });

    const total = await this.prisma.user.count({ where });

    const users = await this.prisma.user.findMany({
      ...dto.toSkipAndTake(),
      include: {
        role: true,
        profile: true,
      },
      where,
      omit: {
        password: true,
      },
    });

    return dto.buildResponse(users, total);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
      include: {
        role: true,
        profile: true,
        operationLog: true,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
        profile: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      omit: {
        password: true,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password
          ? await this.iamService.hash(updateUserDto.password)
          : undefined,
        status: updateUserDto.status,
        roleId: updateUserDto.roleId,
        profile: {
          update: {
            data: {
              phone: updateUserDto.phone,
              bio: updateUserDto.bio,
            },
          },
        },
      },
    });
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { message: 'success' };
  }
}
