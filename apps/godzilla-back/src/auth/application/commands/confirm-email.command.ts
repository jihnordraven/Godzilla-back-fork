import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailConfirmCode } from "@prisma/client"
import { AuthRepository } from "../../repository/auth.repository"
import { Response } from "express"
import { ConfigService } from "@nestjs/config"
import { BadRequestException, NotFoundException } from "@nestjs/common"

export class ConfirmEmailCommand {
	constructor(public readonly dto: { code: string; res: Response }) {}
}

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	constructor(
		private readonly config: ConfigService,
		private readonly authRepository: AuthRepository
	) {}

	private readonly FRONTEND_HOST: string = this.config.get<string>("FRONTEND_HOST")

	async execute({ dto: { code, res } }: ConfirmEmailCommand): Promise<void> {
		const isCode: EmailConfirmCode = await this.authRepository.findOneEmailCodeByCode({ code })
		if (!isCode) {
			res.redirect(`${this.FRONTEND_HOST}/email-code-not-found`)
			throw new NotFoundException("Code not found")
		}

		if ((isCode.isUsed = true)) {
			res.redirect(`${this.FRONTEND_HOST}/email-code-already-used`)
			throw new BadRequestException("This code has already been used")
		}

		const isCodeExpired: boolean = new Date(isCode.exp) <= new Date()
		if (isCodeExpired) {
			await this.authRepository.deactivateAllEmailCodes({ userID: isCode.userID })
			res.redirect(`${this.FRONTEND_HOST}/email-code-expired`)
			throw new BadRequestException("Code has expired")
		}

		await this.authRepository.confirmUserEmail({ userId: isCode.userID })
		await this.authRepository.deactivateAllEmailCodes({ userID: isCode.userID })

		res.redirect(`${this.FRONTEND_HOST}/email-code-success`)
	}
}
