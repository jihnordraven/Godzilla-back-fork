import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { PasswordRecoveryCode, User } from "@prisma/client"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"

export class PasswordRecoveryCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler implements ICommandHandler<PasswordRecoveryCommand> {
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data: { email } }: PasswordRecoveryCommand): Promise<void> {
		const user: User | null = await this.authQueryRepository.findUniqueUserByEmail({ email })

		if (!user) throw new NotFoundException("User not found")

		await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id })

		const passwordRecoveryCode: PasswordRecoveryCode =
			await this.authCommandRepository.createPasswordRecoveryCode({ userID: user.id })

		await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code })
	}
}
