import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export type JwtAccessPayload = {
	readonly userID: string
}
export type JwtRefreshPayload = {
	readonly userID: string
	readonly sessionID: string
	readonly iat: number
}

export const JwtPayloadDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	return request.user ? request.user : {}
})
