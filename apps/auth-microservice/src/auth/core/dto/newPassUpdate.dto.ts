import { IsNotEmpty, IsString, IsUUID, Length, Matches, Validate } from "class-validator"
import { TrimDecorator } from "../../../../../../libs/helpers"
import { CheckedConfirmCode } from "../../class-validators"
import { ApiProperty } from "@nestjs/swagger"
import { NewPassUpdateType } from "../models"

export class NewPassUpdateDto implements NewPassUpdateType {
	@TrimDecorator()
	@Length(6, 20)
	@Matches(
		/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
	)
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "New user password",
		type: String,
		minLength: 6,
		maxLength: 20,
		pattern:
			"^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$",
		nullable: false
	})
	readonly newPassword: string

	//@Validate(CheckedConfirmCode)
	@TrimDecorator()
	@IsUUID()
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Activation code sent to email",
		type: String,
		nullable: false
	})
	readonly recoveryCode: string
}