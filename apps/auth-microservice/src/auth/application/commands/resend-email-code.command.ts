import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailCode, User } from "@prisma/client"
import { AuthRepository } from "../../repositories"
import { NotFoundException } from "@nestjs/common"
import { MailerAdapter } from "../../../adapters"
import { ResendEmailCodeDto } from "../../core/dto/resend-email-code.dto"

export class ResendEmailCodeCommand {
	constructor(public readonly data: ResendEmailCodeDto) {}
}

@CommandHandler(ResendEmailCodeCommand)
export class ResendEmailCodeHandler implements ICommandHandler<ResendEmailCodeCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({ data: { email, code } }: ResendEmailCodeCommand): Promise<void> {
		if (email) {
			const user: User | null = await this.authRepository.findUniqueUserByEmail({
				email
			})

			if (!user) throw new NotFoundException("User not found")

			await this.authRepository.deactivateManyEmailCodes({ userID: user.id })

			const newEmailCode: string = await this.authRepository.createEmailCode({
				userID: user.id
			})

			await this.mailerAdapter.sendConfirmCode({ email, code: newEmailCode })
		} else if (code) {
			const emailCode: EmailCode | null = await this.authRepository.findUniqueEmailCodeByCode(
				{ code }
			)

			if (!emailCode) throw new NotFoundException("Code not found")
			await this.authRepository.deactivateManyEmailCodes({ userID: emailCode.userID })

			const newEmailCode: string = await this.authRepository.createEmailCode({
				userID: emailCode.userID
			})

			await this.mailerAdapter.sendConfirmCode({ email, code: newEmailCode })
		}
	}
}
