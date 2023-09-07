import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerToPasswordEmailResending(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "Resending an activation code by email" }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description:
				"Input data is accepted.Email with confirmation code will be send to " +
				"passed email address"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: "If the inputModel has incorrect values"
		})
	)
}
