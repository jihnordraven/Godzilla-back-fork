import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export type JwtAccessPayload = {
	userID: string
}
export type JwtRefreshPayload = {
	userID: string
	sessionID: string
}

export const JwtPayloadDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	return request.user ? request.user : {}
})
