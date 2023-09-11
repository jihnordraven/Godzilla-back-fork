import { applyDecorators, HttpStatus } from "@nestjs/common"
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger"
import { MeInfoType } from "../../../apps/auth-microservice/src/auth/core/models"

class MeInfoDto implements MeInfoType {
	@ApiProperty()
	userID: string

	@ApiProperty()
	username: string

	@ApiProperty()
	email: string
}

export function SwaggerToMeInfo(): MethodDecorator {
	return applyDecorators(
		ApiOperation({ summary: "Get information about current user" }),
		ApiResponse({
			status: HttpStatus.OK,
			description: "User info",
			type: MeInfoDto
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: "If the JWT accessToken missing, expired or incorrect"
		})
	)
}
