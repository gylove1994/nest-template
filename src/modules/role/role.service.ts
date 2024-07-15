import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationRoleDto } from './dto/pagination-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    let apiPermissions = [];
    let permissions = [];
    if (createRoleDto.apiPermissionIds) {
      apiPermissions = await this.prisma.apiPermission.findMany({
        where: {
          id: {
            in: createRoleDto.apiPermissionIds,
          },
        },
      });
      if (apiPermissions.length !== createRoleDto.apiPermissionIds.length) {
        throw new Error('apiPermissionIds is invalid');
      }
    }
    if (createRoleDto.permissionIds) {
      permissions = await this.prisma.permission.findMany({
        where: {
          id: {
            in: createRoleDto.permissionIds,
          },
        },
      });
      if (permissions.length !== createRoleDto.permissionIds.length) {
        throw new Error('permissionIds is invalid');
      }
    }
    const role = await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        description: createRoleDto.description,
        ...(apiPermissions.length > 0
          ? { apiPermission: { connect: apiPermissions } }
          : {}),
        ...(permissions.length > 0
          ? { permission: { connect: permissions } }
          : {}),
      },
      include: {
        apiPermissions: apiPermissions.length > 0 ? true : false,
        permissions: permissions.length > 0 ? true : false,
      },
    });
    return role;
  }

  async findAll(dto: PaginationRoleDto) {
    if (dto.all) {
      const c = await this.prisma.role.count();
      const roles = await this.prisma.role.findMany({
        include: {
          apiPermissions: true,
          permissions: true,
        },
        where: {
          deletedAt: null,
        },
      });
      return { total: c, page: 1, pageSize: c, data: roles };
    }
    const { page, pageSize } = dto;
    const total = await this.prisma.role.count({
      where: {
        name: {
          contains: dto.filter?.name,
        },
        deletedAt: null,
      },
    });
    const roles = await this.prisma.role.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        apiPermissions: true,
        permissions: true,
      },
      where: {
        deletedAt: null,
        name: {
          contains: dto.filter?.name,
        },
      },
    });
    return { total, page, pageSize, data: roles };
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        apiPermissions: true,
        permissions: true,
      },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    let apiPermissions = [];
    let permissions = [];
    if (updateRoleDto.apiPermissionIds) {
      apiPermissions = await this.prisma.apiPermission.findMany({
        where: {
          id: {
            in: updateRoleDto.apiPermissionIds,
          },
        },
      });
      if (apiPermissions.length !== updateRoleDto.apiPermissionIds.length) {
        throw new Error('apiPermissionIds is invalid');
      }
    }
    if (updateRoleDto.permissionIds) {
      permissions = await this.prisma.permission.findMany({
        where: {
          id: {
            in: updateRoleDto.permissionIds,
          },
        },
      });
      if (permissions.length !== updateRoleDto.permissionIds.length) {
        throw new Error('permissionIds is invalid');
      }
    }
    const role = await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: updateRoleDto.name,
        description: updateRoleDto.description,
        ...(apiPermissions.length > 0
          ? { apiPermissions: { set: apiPermissions } }
          : {}),
        ...(permissions.length > 0 ? { permission: { set: permissions } } : {}),
      },
      include: {
        apiPermissions: apiPermissions.length > 0 ? true : false,
        permissions: permissions.length > 0 ? true : false,
      },
    });
    return role;
  }

  async remove(id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    await this.prisma.role.update({
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
