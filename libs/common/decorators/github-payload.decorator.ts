import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { Request } from "express"

export const GithubPayloadDecorator = createParamDecorator(
	(key: keyof any, ctx: ExecutionContext): any => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
