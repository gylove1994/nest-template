import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SubscribeService {
  constructor(private readonly prismaService: PrismaService) {}
}
