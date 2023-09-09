import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { IGoogleUser } from "apps/auth-microservice/src/auth/protection/strategies"
import { Request } from "express"

export const GooglePayloadDecorator = createParamDecorator(
	(key: keyof IGoogleUser, ctx: ExecutionContext): IGoogleUser | keyof IGoogleUser => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
