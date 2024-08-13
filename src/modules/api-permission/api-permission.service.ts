import { Injectable } from '@nestjs/common';
import { UpdateApiPermissionDto } from './dto/update-api-permission.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationApiPermissionDto } from './dto/pagination-api-permission.dto';
import { ApiPermission } from '@/_gen/prisma-class/api_permission';
import { dv } from '@/utils/dv';

@Injectable()
export class ApiPermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationApiPermissionDto) {
    const where = paginationDto.buildWhere<ApiPermission>({
      props: {
        name: { type: 'contains' },
        roleIds: { type: 'sin', mapper: 'roles' },
        permissionGroupIds: { type: 'sin', mapper: 'apiPermissionGroups' },
      },
    });
    const apiPermissions = await this.prisma.apiPermission.findMany({
      include: {
        roles: true,
        apiPermissionGroups: true,
      },
      ...paginationDto.toSkipAndTake(),
      where,
    });
    const total = await this.prisma.apiPermission.count({
      where,
    });
    return paginationDto.buildResponse(apiPermissions, total);
  }

  async findOne(id: string) {
    const apiPermission = await this.prisma.apiPermission.findUnique({
      include: {
        roles: true,
      },
      where: { id },
    });
    return apiPermission;
  }

  async update(updateApiPermissionDto: UpdateApiPermissionDto) {
    const { roleIds, permissionGroupIds } = updateApiPermissionDto;
    const apiPermission = await this.prisma.apiPermission.update({
      where: { id: updateApiPermissionDto.id },
      data: {
        isPublic: updateApiPermissionDto.isPublic,
        ...dv(roleIds, {
          roles: {
            connect: roleIds.map((id) => ({ id })),
          },
        }),
        ...dv(permissionGroupIds, {
          permissionGroups: {
            connect: permissionGroupIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        roles: true,
        apiPermissionGroups: true,
      },
    });
    return apiPermission;
  }
}
