import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthRepository } from "../../repository/auth.repository"
import { PasswordRecoveryCode, User } from "@prisma/client"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"

export class PasswordRecoveryResendCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(PasswordRecoveryResendCommand)
export class PasswordRecoveryResendHandler
	implements ICommandHandler<PasswordRecoveryResendCommand>
{
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data: { email } }: PasswordRecoveryResendCommand): Promise<void> {
		const user: User | null = await this.authRepository.findUserToEmail({ email })

		if (!user) throw new NotFoundException("User not found")

		await this.authRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id })

		const passwordRecoveryCode: PasswordRecoveryCode =
			await this.authRepository.createPasswordRecoveryCode({ userID: user.id })

		await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code })
	}
}
