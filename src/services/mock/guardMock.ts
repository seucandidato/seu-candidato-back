import { ExecutionContext } from '@nestjs/common';

export const GuardMock = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (token === 'Bearer test' || token === 'Bearer test2') {
      request.user = {
        sub: 1,
        username: 'clarckkent',
        iat: 1715022887,
        exp: 1715022947,
      };
      return true;
    } else if (token === 'Bearer test3') {
      request.user = {
        sub: 2,
        username: 'clarckkentt',
        iat: 1715022888,
        exp: 1715022948,
      };
      return true;
    }

    return false;
  },
};
