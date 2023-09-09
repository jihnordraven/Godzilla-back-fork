import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerToRegistrationEmailResending(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "Resending an activation code by email" }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "New confirmation code was sent to user's email"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: "If the inputModel has incorrect values"
		})
	)
}
