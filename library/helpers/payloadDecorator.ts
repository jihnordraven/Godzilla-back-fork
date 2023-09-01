import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtAccessPayload = {
  userId: string;
};

export type JwtRefreshPayload = {
  userId: string;
  deviceId: string;
};

export const mockToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNWRmNmQxOC05NWM3LTRhMDgtYTgzYy00YjJiOWJkYmQ2ODQiLCJpYXQiOjE1MTYyMzkwMjJ9.KltiMPbQy6K0u4bbzaB8X2Kr2dTlIKTB-X5y1auugkA';

export const JwtPayloadDecorator = createParamDecorator(
  (ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user ? request.user : {};
  },
);
