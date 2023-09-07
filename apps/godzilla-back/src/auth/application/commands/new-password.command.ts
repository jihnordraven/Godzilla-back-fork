import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { NewPassUpdateDto } from "../../core/dto"
import { AuthRepository } from "../../repository/auth.repository"
import { EmailConfirmCode } from "@prisma/client"
import { BadRequestException, ForbiddenException } from "@nestjs/common"
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

	async execute({
		data: { newPassword, recoveryCode }
	}: NewPasswordCommand): Promise<void> {
		const emailCode: EmailConfirmCode | null =
			await this.authRepository.findOneCodeByCode({
				code: recoveryCode
			})
		if (!emailCode) throw new BadRequestException("Invalid token")

		const isCodeExpired: boolean = new Date(emailCode.exp) < new Date()
		if (isCodeExpired) throw new ForbiddenException("Code has expired")

		const hashPassword: string = await this.bcryptAdapter.hash({
			password: newPassword
		})

		await this.authRepository.createNewPassword({
			userId: emailCode.userId,
			hashPassword
		})
	}
}
