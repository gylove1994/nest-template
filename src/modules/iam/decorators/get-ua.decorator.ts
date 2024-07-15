import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUA = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['user-agent'];
  },
);
