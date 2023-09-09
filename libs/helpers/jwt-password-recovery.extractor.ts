import { Request } from "express"

export const JwtPasswordRecoveryExtractor = (req: Request): string => {
	let code: null | string = null

	if (req && req.params) {
		code = req.params["code"]
	}

	return code
}
