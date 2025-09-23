import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('llegue aca');
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    return request.user;
  },
);
