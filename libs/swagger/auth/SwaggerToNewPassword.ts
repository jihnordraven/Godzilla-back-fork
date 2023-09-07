import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerToNewPassword(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "Changing the user password to a new password" }),
		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: "If code is valid and new password is accepted"
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description:
				"If the inputModel has incorrect value (for incorrect password length) or " +
				"RecoveryCode is incorrect or expired"
		})
	)
}
