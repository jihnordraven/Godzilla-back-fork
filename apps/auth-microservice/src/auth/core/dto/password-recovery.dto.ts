import { IsNotEmpty, IsString, Matches } from "class-validator"
import { TrimDecorator } from "../../../../../../libs/helpers"
import { PassRecoveryType } from "../models"
import { ApiProperty } from "@nestjs/swagger"

export class PasswordRecoveryDto implements PassRecoveryType {
	//@Validate(CheckedEmailToBase)
	@TrimDecorator()
	@IsString()
	@Matches(/^[A-Za-z\d-\.]+@([\w-]+.)+[\w-]{2,4}$/)
	@ApiProperty({
		description: "Email of registered user useremail@company.com",
		type: String,
		pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
		nullable: false
	})
	@IsNotEmpty()
	readonly email: string
}
