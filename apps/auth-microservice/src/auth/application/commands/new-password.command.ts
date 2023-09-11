import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { NewPassUpdateDto } from "../../core/dto"
import { AuthRepository } from "../../repositories"
import { EmailCode, User } from "@prisma/client"
import { BadRequestException } from "@nestjs/common"
import { BcryptAdapter } from "../../../adapters"

export class NewPasswordCommand {
	constructor(public readonly data: NewPassUpdateDto) {}
}

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly bcryptAdapter: BcryptAdapter
	) {}

	public async execute({ data: { password, code } }: NewPasswordCommand): Promise<void> {
		const emailCode: EmailCode | null = await this.authRepository.findUniqueEmailCodeByCode({
			code
		})

		if (!emailCode) throw new BadRequestException("Invalid code")

		const user: User | null = await this.authRepository.findUniqueUserByID({
			userID: emailCode.userID
		})
		if (!user) throw new BadRequestException("User doesn't exist")

		const hashPassword: string = await this.bcryptAdapter.hash({ password })

		await this.authRepository.createNewPassword({
			userId: user.id,
			hashPassword
		})
	}
}
