import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export type JwtAccessPayload = {
	userId: string
}
export type JwtRefreshPayload = {
	userId: string
	sessionId: string
}

export const JwtPayloadDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()

		return request.user ? request.user : {}
	}
)
