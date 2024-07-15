import { Body, Controller, Post } from '@nestjs/common';
import { IamService } from './iam.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';
import { GetToken } from './decorators/get-token.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUA } from './decorators/get-ua.decorator';

@ApiTags('认证及授权模块')
@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('signIn')
  @ApiOperation({ summary: '用户登录' })
  async signIn(@Body() dto: SignInDto, @GetUA() ua?: string) {
    return this.iamService.signIn(dto, ua);
  }

  @Post('signUp')
  @ApiOperation({ summary: '用户注册' })
  async signUp(@Body() dto: SignUpDto) {
    return this.iamService.signUp(dto);
  }

  @Post('signOut')
  @ApiOperation({ summary: '用户登出' })
  async signOut(@GetUser() user?: User, @GetToken() token?: string) {
    return this.iamService.signOutByToken(user, token);
  }
}
