import { Injectable } from '@nestjs/common';
import { UpdateApiPermissionDto } from './dto/update-api-permission.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationApiPermissionDto } from './dto/pagination-api-permission.dto';

@Injectable()
export class ApiPermissionService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(paginationDto: PaginationApiPermissionDto) {
    const apiPermissions = await this.prisma.apiPermission.findMany({
      include: {
        roles: true,
        apiPermissionGroups: true,
      },
      ...paginationDto.toSkipAndTake(),
      where: {
        ...paginationDto.buildWhereWithNoDelete({
          name: 'contains',
          roleIds: ['sin', 'roles'],
          permissionGroupIds: ['sin', 'permissionGroups'],
        }),
      },
    });
    const total = await this.prisma.apiPermission.count({
      where: {
        ...paginationDto.buildWhereWithNoDelete({
          name: 'contains',
          roleIds: ['sin', 'roles'],
          permissionGroupIds: ['sin', 'permissionGroups'],
        }),
      },
    });
    return {
      data: apiPermissions,
      total,
      page: paginationDto.page,
      pageSize: paginationDto.pageSize,
    };
  }

  async findOne(id: string) {
    const apiPermission = await this.prisma.apiPermission.findUnique({
      where: { id },
      include: {
        roles: true,
        apiPermissionGroups: true,
      },
    });
    return apiPermission;
  }

  async update(id: string, updateApiPermissionDto: UpdateApiPermissionDto) {
    const { roleIds, permissionGroupIds } = updateApiPermissionDto;
    const apiPermission = await this.prisma.apiPermission.update({
      where: { id },
      data: {
        isPublic: updateApiPermissionDto.isPublic,
        ...(roleIds
          ? {
              roles: {
                connect: roleIds.map((id) => ({ id })),
              },
            }
          : {}),
        ...(permissionGroupIds
          ? {
              permissionGroups: {
                connect: permissionGroupIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        roles: true,
        apiPermissionGroups: true,
      },
    });
    return apiPermission;
  }
}
