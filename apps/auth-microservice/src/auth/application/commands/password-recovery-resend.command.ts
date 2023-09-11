import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthRepository } from "../../repositories"
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
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({ data: { code } }: PasswordRecoveryResendCommand): Promise<void> {
		const emailCode: EmailCode | null = await this.authRepository.findUniqueEmailCodeByCode({
			code
		})
		if (!emailCode) throw new NotFoundException("Email code not found")

		const user: User | null = await this.authRepository.findUniqueUserByID({
			userID: emailCode.userID
		})
		if (!user) throw new NotFoundException("User not found")

		await this.authRepository.deactivateOneEmailCode({ code })

		const newEmailCode: string = await this.authRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendPasswordCode({ email: user.email, code: newEmailCode })
	}
}
