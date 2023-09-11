import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsUUID, Matches } from "class-validator"
import { emailPattern } from "libs/common/patterns"
import { TrimDecorator } from "libs/helpers"

export class ResendEmailCodeDto {
	@TrimDecorator()
	@IsString()
	@Matches(emailPattern())
	@IsOptional()
	@ApiProperty({
		description: "User email",
		type: String,
		pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
		nullable: false
	})
	readonly email?: string

	@TrimDecorator()
	@IsUUID()
	@IsString()
	@IsOptional()
	@ApiProperty({
		description: "Activation code sent to email",
		type: String,
		nullable: false
	})
	readonly code?: string
}
