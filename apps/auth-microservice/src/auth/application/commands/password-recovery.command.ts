import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { User } from "@prisma/client"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { PasswordRecoveryDto } from "../../core/dto"

export class PasswordRecoveryCommand {
	constructor(public readonly data: PasswordRecoveryDto) {}
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

		await this.authCommandRepository.deactivateManyEmailCodes({ userID: user.id })

		const code: string = await this.authCommandRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendPasswordCode({ email, code })
	}
}
