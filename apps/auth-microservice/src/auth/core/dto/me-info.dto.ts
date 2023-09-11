import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { TrimDecorator } from "../../../../../../libs/helpers"

export class MeInfoDto {
	@TrimDecorator()
	@IsUUID()
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Activation code sent to email",
		type: String,
		nullable: false
	})
	userID: string
}
