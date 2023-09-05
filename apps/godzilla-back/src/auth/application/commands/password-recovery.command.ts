import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { AuthRepository } from '../../repository/auth.repository'
import { NotFoundException } from '@nestjs/common'
import { ActivateCodeAdapter, ActivateCodeType } from '../../../adapters'
import { MailerAdapter } from '../../../adapters/mailer.adapter'

export class PasswordRecoveryCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler implements ICommandHandler<PasswordRecoveryCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly activateCodeAdapter: ActivateCodeAdapter,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data: { email } }: PasswordRecoveryCommand): Promise<void> {
		const user: User | null = await this.authRepository.findUserToEmail(email)

		if (!user) throw new NotFoundException('User not found')

		const passwordCode: ActivateCodeType = await this.activateCodeAdapter.createCode()

		await this.mailerAdapter.sendPasswordCode({
			email,
			code: passwordCode.codeActivated
		})
	}
}
