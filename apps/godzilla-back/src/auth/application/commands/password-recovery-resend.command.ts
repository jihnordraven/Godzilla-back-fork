import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthRepository } from "../../repository/auth.repository"
import { User } from "@prisma/client"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { ActivateCodeAdapter, ActivateCodeType } from "../../../adapters"

export class PasswordRecoveryResendCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(PasswordRecoveryResendCommand)
export class PasswordRecoveryResendHandler
	implements ICommandHandler<PasswordRecoveryResendCommand>
{
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter,
		protected readonly activateCodeAdapter: ActivateCodeAdapter
	) {}

	async execute({ data: { email } }: PasswordRecoveryResendCommand): Promise<void> {
		const user: User | null = await this.authRepository.findUserToEmail({ email })

		if (!user) throw new NotFoundException("User not found")

		await this.authRepository.deactivateAllEmailCodes({ userId: user.id })

		const passwordCode: ActivateCodeType = await this.activateCodeAdapter.createCode()

		await this.mailerAdapter.sendPasswordCode({
			email,
			code: passwordCode.codeActivated
		})
	}
}
