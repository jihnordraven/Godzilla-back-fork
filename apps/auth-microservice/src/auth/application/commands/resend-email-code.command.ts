import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailConfirmCode, User } from "@prisma/client"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters"

export class ResendEmailCodeCommand {
	constructor(public readonly data: { email: string }) {}
}

@CommandHandler(ResendEmailCodeCommand)
export class ResendEmailCodeHandler implements ICommandHandler<ResendEmailCodeCommand> {
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data: { email } }: ResendEmailCodeCommand): Promise<void> {
		const user: User | null = await this.authQueryRepository.findUniqueUserByEmail({ email })

		if (!user) throw new NotFoundException("User not found")

		await this.authCommandRepository.deactivateAllEmailCodes({ userID: user.id })

		const code: string = await this.authCommandRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendConfirmCode({ email, code })
	}
}
