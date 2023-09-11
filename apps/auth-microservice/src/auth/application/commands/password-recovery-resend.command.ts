import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { EmailCode, User } from "@prisma/client"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { PasswordRecoveryResendDto } from "../../core/dto"

export class PasswordRecoveryResendCommand {
	constructor(public readonly data: PasswordRecoveryResendDto) {}
}

@CommandHandler(PasswordRecoveryResendCommand)
export class PasswordRecoveryResendHandler
	implements ICommandHandler<PasswordRecoveryResendCommand>
{
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ data: { code } }: PasswordRecoveryResendCommand): Promise<void> {
		const emailCode: EmailCode | null =
			await this.authQueryRepository.findUniqueEmailCodeByCode({ code })
		if (!emailCode) throw new NotFoundException("Email code not found")

		const user: User | null = await this.authQueryRepository.findUniqueUserByID({
			userID: emailCode.userID
		})
		if (!user) throw new NotFoundException("User not found")

		await this.authCommandRepository.deactivateOneEmailCode({ code })

		const newEmailCode: string = await this.authCommandRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendPasswordCode({ email: user.email, code: newEmailCode })
	}
}
