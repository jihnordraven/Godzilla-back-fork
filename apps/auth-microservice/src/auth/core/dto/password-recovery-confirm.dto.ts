import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { Response } from "express"
import { TrimDecorator } from "../../../../../../libs/helpers"

export class PasswordRecoveryConfirmDto {
	@TrimDecorator()
	@IsUUID()
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Activation code sent to email",
		type: String,
		nullable: false
	})
	readonly code: string

	readonly res: Response
}
