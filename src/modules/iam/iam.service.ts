import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/sign-up.dto';
import { PrismaService } from 'nestjs-prisma';
import { SignInDto } from './dtos/sign-in.dto';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PRESET_ROLE } from './constants/preset-role.constant';
import InitUtil from '@/utils/init';
import { IAM_INIT_KEY } from './constants/iam-init.constant';

@Injectable()
export class IamService implements OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}
  async onApplicationBootstrap() {
    const count = await this.prisma.role.count();
    if (count === 0) {
      await this.prisma.role.createMany({
        data: PRESET_ROLE,
      });
    }
    InitUtil.init(IAM_INIT_KEY);
  }

  async hash(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(str, salt);
  }

  async compare(str: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(str, hash);
  }

  async genSession(user?: User, ua?: string) {
    if (ua) {
      const hasSameSession = await this.prisma.session.findFirst({
        where: {
          userId: user.id,
          expiresAt: {
            gt: new Date(),
          },
          description: ua,
        },
      });
      // 如果已经有相同ua的session，删除
      if (hasSameSession) {
        await this.prisma.session.delete({
          where: {
            id: hasSameSession.id,
          },
        });
      }
    }
    const token = randomBytes(32).toString('hex');
    return this.prisma.session.create({
      data: {
        token,
        user: {
          connect: {
            id: user.id,
          },
        },
        description: ua ?? 'unknown device',
        // 7 days
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });
  }

  async signIn(dto: SignInDto, ua?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!(await this.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    return this.genSession(user, ua);
  }

  async signUp(dto: SignUpDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const password = await this.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password,
        // TODO: 通过status控制用户是否验证邮箱
        status: 'ACTIVE',
        role: {
          connect: {
            name: 'user',
          },
        },
      },
    });
    delete newUser.password;
    return newUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendVerificationEmail(_user: User) {
    // Todo: 添加发送邮件逻辑
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyEmail(_token: string) {
    // Todo: 添加验证邮件逻辑
    throw new Error('Not implemented');
  }

  async getSessionList(user: User) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId: user.id,
      },
    });
    return sessions.map((s) => ({
      ...s,
      token: null,
    }));
  }

  async signOutByToken(user: User, token: string) {
    await this.prisma.session.deleteMany({
      where: {
        userId: user.id,
        token,
      },
    });
  }
}
