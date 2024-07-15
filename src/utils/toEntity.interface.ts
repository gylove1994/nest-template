import { PrismaService } from 'nestjs-prisma';

export interface ToEntity<T> {
  toEntity(prisma: PrismaService): T | Promise<T>;
}
