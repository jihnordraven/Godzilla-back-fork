import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator"
import { TrimDecorator } from "libs/helpers"

export class ResendEmailCodeDto {
	@TrimDecorator()
	@IsString()
	@Matches(/^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/)
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
