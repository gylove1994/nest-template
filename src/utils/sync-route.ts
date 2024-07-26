import { INestApplication, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

interface Route {
  path: string;
  method: string;
}

export async function syncRoute(app: INestApplication) {
  const server = app.getHttpServer();
  const prisma = app.get(PrismaService);
  const router = server._events.request._router;
  const availableRoutes: Route[] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(
      (item) => item !== undefined && !item.route.path.startsWith('/sapi'),
    )
    .map((item) => item.route);
  const existingRoutes = await prisma.apiPermission.findMany();
  const existingRoutesPaths = existingRoutes.map((route) => route.path);
  const deletedRoutes = existingRoutes.filter(
    (route) => !availableRoutes.map((route) => route.path).includes(route.path),
  );
  const newRoutes = availableRoutes.filter(
    (route) => !existingRoutesPaths.includes(route.path),
  );
  const deletedRes = await prisma.apiPermission.deleteMany({
    where: {
      id: {
        in: deletedRoutes.map((route) => route.id),
      },
    },
  });
  Logger.log(`Deleted ${deletedRes.count} routes`, 'SyncRoute');
  Logger.log(deletedRoutes, 'SyncRoute');
  Logger.log(`Creating ${newRoutes.length} routes`, 'SyncRoute');
  Logger.log(newRoutes, 'SyncRoute');
  Logger.log('Syncing routes', 'SyncRoute');
  const createdRes = await prisma.apiPermission.createMany({
    data: newRoutes.map((route) => ({
      path: route.path,
      method: route.method,
    })),
  });
  if (deletedRes.count > 0) {
    Logger.log(`Deleted ${deletedRes.count} routes`, 'SyncRoute');
    Logger.log(deletedRoutes, 'SyncRoute');
  }
  if (createdRes.count > 0) {
    Logger.log(`Created ${createdRes.count} routes`, 'SyncRoute');
    Logger.log(newRoutes, 'SyncRoute');
  }
  if (deletedRes.count > 0 || createdRes.count > 0) {
    Logger.log('Routes synced', 'SyncRoute');
  }
}
