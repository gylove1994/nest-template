import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiPermission, Role, User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ApiPermissionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];
    let session = null;
    if (token) {
      session = await this.prisma.session.findFirst({
        where: {
          token,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: {
            include: {
              role: {
                include: {
                  apiPermissions: true,
                },
              },
            },
          },
        },
      });
      req.user = session ? session.user : undefined;
      Logger.log(
        `Incoming request user:${req.user ? req.user.email : 'invalid-token'}`,
        'ApiPermissionGuard',
      );
    } else {
      req.user = undefined;
    }
    const user:
      | (User & Record<'role', Role & Record<'apiPermission', ApiPermission[]>>)
      | undefined = request['user'];
    const path = request.route.path;
    const method = request.method;
    const url = request.url;
    const data = {
      body: request.body,
      query: request.query,
      params: request.params,
      url,
      success: undefined,
    };
    Logger.log(`Incoming request ${method} ${path}`, 'ApiPermissionGuard');
    Logger.log(
      `Incoming request data:\n ${JSON.stringify(data)}`,
      'ApiPermissionGuard',
    );
    const api = await this.prisma.apiPermission.findFirstOrThrow({
      where: {
        path,
        method: method.toLowerCase(),
      },
      include: {
        roles: true,
      },
    });
    if (api.isPublic) {
      return true;
    }
    if (!session) {
      throw new UnauthorizedException('Token not found or expired');
    }
    if (user === undefined || user.role === undefined) {
      throw new UnauthorizedException('User not found or role not found');
    }
    if (user.role.name === 'admin') {
      data.success = true;
      await this.prisma.operationLog.create({
        data: {
          userId: user.id,
          apiPermissionId: api.id,
          data: JSON.stringify(data),
        },
      });
      return true;
    }
    const userApiPermission = user.role.apiPermission;
    if (userApiPermission && userApiPermission.find((p) => p.id === api.id)) {
      data.success = true;
      await this.prisma.operationLog.create({
        data: {
          userId: user.id,
          apiPermissionId: api.id,
          data: JSON.stringify(data),
        },
      });
      return true;
    }
    data.success = false;
    await this.prisma.operationLog.create({
      data: {
        userId: user.id,
        apiPermissionId: api.id,
        data: JSON.stringify(data),
      },
    });
    return false;
  }
}
