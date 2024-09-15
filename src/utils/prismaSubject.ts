import { BehaviorSubject } from 'rxjs';
import { type PrismaClient } from '@prisma/client';

export const prismaSubject = new BehaviorSubject<PrismaClient | null>(null);
