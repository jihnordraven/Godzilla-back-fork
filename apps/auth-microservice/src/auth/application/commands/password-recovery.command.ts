import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { User } from "@prisma/client"
import { AuthRepository } from "../../repositories"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { PasswordRecoveryDto } from "../../core/dto"

export class PasswordRecoveryCommand {
	constructor(public readonly data: PasswordRecoveryDto) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryHandler implements ICommandHandler<PasswordRecoveryCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({ data: { email } }: PasswordRecoveryCommand): Promise<void> {
		const user: User | null = await this.authRepository.findUniqueUserByEmail({ email })

		if (!user) throw new NotFoundException("User not found")

		await this.authRepository.deactivateManyEmailCodes({ userID: user.id })

		const code: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendPasswordCode({ email, code })
	}
}
