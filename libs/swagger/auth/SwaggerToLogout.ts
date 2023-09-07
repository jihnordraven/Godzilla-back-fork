import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerToLogout(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "User is logout" }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "User is logout"
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description:
				"If the JWT refreshToken inside cookie is missing, expired or incorrect"
		})
	)
}
