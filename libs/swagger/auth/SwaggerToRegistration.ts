import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerToRegistration(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "User registration" }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "User created successfully, sent an confirmation code to user's email"
		}),
		ApiResponse({
			status: HttpStatus.CONFLICT,
			description: "Email or username is already existing"
		})
	)
}
