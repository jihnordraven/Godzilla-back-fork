import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { NewPassUpdateDto } from "../../core/dto"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { PasswordRecoveryCode, User } from "@prisma/client"
import { BadRequestException } from "@nestjs/common"
import { BcryptAdapter } from "../../../adapters"

export class NewPasswordCommand {
	constructor(public readonly data: NewPassUpdateDto) {}
}

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly bcryptAdapter: BcryptAdapter
	) {}

	async execute({ data: { newPassword, recoveryCode } }: NewPasswordCommand): Promise<void> {
		const passwordRecoveryCode: PasswordRecoveryCode | null =
			await this.authQueryRepository.findUniquePasswordRecoveryCodeByCode({
				code: recoveryCode
			})
		if (!passwordRecoveryCode) throw new BadRequestException("Invalid code")

		const user: User | null = await this.authQueryRepository.findUniqueUserByID({
			userID: passwordRecoveryCode.userID
		})
		if (!user) throw new BadRequestException("User doesn't exist")

		const hashPassword: string = await this.bcryptAdapter.hash({
			password: newPassword
		})

		await this.authCommandRepository.createNewPassword({
			userId: user.id,
			hashPassword
		})
	}
}