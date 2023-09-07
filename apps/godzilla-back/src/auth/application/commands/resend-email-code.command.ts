import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailConfirmCode, User } from "@prisma/client"
import { AuthRepository } from "../../repository/auth.repository"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters"

export class ResendEmailCodeCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(ResendEmailCodeCommand)
export class ResendEmailCodeHandler implements ICommandHandler<ResendEmailCodeCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data }: ResendEmailCodeCommand): Promise<void> {
		const user: User | null = await this.authRepository.findUserToEmail({
			email: data.email
		})

		if (!user) throw new NotFoundException("User not found")

		await this.authRepository.deactivateAllEmailCodes({ userId: user.id })

		const emailCode: EmailConfirmCode = await this.authRepository.createEmailCode({
			userId: user.id
		})

		await this.mailerAdapter.sendConfirmCode({
			email: user.email,
			code: emailCode.code
		})
	}
}
