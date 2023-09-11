import { HttpStatus, applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger"
import { LoginResType } from "apps/auth-microservice/src/auth/core/models"

class LoginResDto implements LoginResType {
	@ApiProperty({
		description: "Access token"
	})
	accessToken: string
}

export function SwaggerToGoogleOAuth(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "User authorization" }),
		ApiResponse({
			status: HttpStatus.OK,
			description:
				"Returns JWT accessToken in body and JWT refreshToken " +
				"in cookie (http-only, secure)",
			type: LoginResDto
		})
	)
}
