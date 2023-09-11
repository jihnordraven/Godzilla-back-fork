import { TrimDecorator } from "../../../../../../libs/helpers"
import { IsEmail, IsNotEmpty, IsString, Length, Matches, Validate } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { CheckedUniqueEmail, CheckedUniqueUsername } from "../../class-validators"
import { CreateUserType } from "../models"

export class CreateUserDto implements CreateUserType {
	//@Validate(CheckedUniqueUsername)
	@TrimDecorator()
	@IsString()
	@Matches(/^[0-9A-Za-z.\-_]+$/)
	@Length(6, 30)
	@IsNotEmpty()
	@ApiProperty({
		description: "User username",
		type: String,
		minLength: 6,
		maxLength: 30,
		pattern: "^[0-9A-Za-z.\\-_]+$",
		nullable: false
	})
	readonly username: string

	//@Validate(CheckedUniqueEmail)
	@TrimDecorator()
	@IsString()
	@Matches(/^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/)
	@IsNotEmpty()
	@ApiProperty({
		description: "User email",
		type: String,
		pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
		nullable: false
	})
	readonly email: string

	@TrimDecorator()
	@Matches(
		/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\\/]+$/
	)
	@IsString()
	@Length(6, 20)
	@IsNotEmpty()
	@ApiProperty({
		description: "User password",
		type: String,
		minLength: 6,
		maxLength: 20,
		pattern:
			"^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$",
		nullable: false
	})
	readonly password: string
}
