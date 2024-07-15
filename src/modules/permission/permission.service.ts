import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationPermissionDto } from './dto/pagination-permission.dto';
import { Permission } from 'src/_gen/prisma-class/permission';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.prisma.permission.create({
      data: {
        name: createPermissionDto.name,
        description: createPermissionDto.description,
        roles: {
          connect: createPermissionDto.roleIds?.map((id) => ({ id })),
        },
        permissionGroups: {
          connect: createPermissionDto.permissionGroupIds?.map((id) => ({
            id,
          })),
        },
      },
      include: {
        roles: true,
        permissionGroups: true,
      },
    });
    return permission;
  }

  async findAll(paginate: PaginationPermissionDto) {
    const permissions = await this.prisma.permission.findMany({
      include: {
        roles: true,
        permissionGroups: true,
      },
      ...paginate.toSkipAndTake(),
      where: {
        ...paginate.buildWhereWithNoDelete<Permission>({
          name: 'contains',
          roleIds: ['sin', 'roles'],
          permissionGroupIds: ['sin', 'permissionGroups'],
        }),
      },
    });
    const total = await this.prisma.permission.count({
      where: {
        ...paginate.buildWhereWithNoDelete<Permission>({
          name: 'contains',
          roleIds: ['sin', 'roles'],
          permissionGroupIds: ['sin', 'permissionGroups'],
        }),
      },
    });
    return {
      data: permissions,
      total,
      page: paginate.page,
      pageSize: paginate.pageSize,
    };
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        roles: true,
        permissionGroups: true,
      },
    });
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        name: updatePermissionDto.name,
        description: updatePermissionDto.description,
        ...(updatePermissionDto.roleIds
          ? {
              roles: {
                set: updatePermissionDto.roleIds.map((id) => ({ id })),
              },
            }
          : {}),
        ...(updatePermissionDto.permissionGroupIds
          ? {
              permissionGroups: {
                set: updatePermissionDto.permissionGroupIds.map((id) => ({
                  id,
                })),
              },
            }
          : {}),
      },
      include: {
        roles: true,
        permissionGroups: true,
      },
    });
    return permission;
  }

  async remove(id: string) {
    await this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { data: 'success' };
  }
}
