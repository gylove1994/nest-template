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
    const { page, pageSize } = dto;
    const total = await this.prisma.user.count({
      where: {
        deletedAt: null,
        id: {
          contains: dto.filter?.id,
        },
        email: {
          contains: dto.filter?.email,
        },
        name: {
          contains: dto.filter?.name,
        },
        status: {
          equals: dto.filter?.status,
        },
        roleId: {
          equals: dto.filter?.roleId,
        },
      },
    });
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        role: true,
        profile: true,
      },
      where: {
        deletedAt: null,
        id: {
          contains: dto.filter?.id,
        },
        email: {
          contains: dto.filter?.email,
        },
        name: {
          contains: dto.filter?.name,
        },
        status: {
          equals: dto.filter?.status,
        },
        roleId: {
          equals: dto.filter?.roleId,
        },
      },
    });
    const noPassUsers = users.map((user) => {
      delete user.password;
      return user;
    });
    return {
      total,
      page,
      pageSize,
      data: noPassUsers,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
        profile: true,
        operationLog: true,
      },
    });
    delete user.password;
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
    delete updatedUser.password;
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
