import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailConfirmCode } from "@prisma/client"
import { AuthCommandRepository } from "../../repositories/auth-command.repository"
import { Response } from "express"
import { ConfigService } from "@nestjs/config"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { AuthQueryRepository } from "../../repositories"

export class ConfirmEmailCommand {
	constructor(public readonly dto: { code: string; res: Response }) {}
}

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	constructor(
		private readonly config: ConfigService,
		private readonly authCommandRepository: AuthCommandRepository,
		private readonly authQueryRepository: AuthQueryRepository
	) {}

	private readonly FRONTEND_HOST: string = this.config.get<string>("FRONTEND_HOST")

	async execute({ dto: { code, res } }: ConfirmEmailCommand): Promise<void> {
		const emailConfirmCode: EmailConfirmCode | null =
			await this.authQueryRepository.findUniqueEmailCodeByCode({ code })
		if (!emailConfirmCode) {
			res.redirect(`${this.FRONTEND_HOST}/email-code-not-found`)
			throw new NotFoundException("Code not found")
		}

		if (emailConfirmCode.isUsed == true) {
			res.redirect(`${this.FRONTEND_HOST}/email-code-already-used`)
			throw new BadRequestException("This code has already been used")
		}

		const isCodeExpired: boolean = new Date(emailConfirmCode.exp) <= new Date()
		if (isCodeExpired) {
			await this.authCommandRepository.deactivateAllEmailCodes({
				userID: emailConfirmCode.userID
			})
			res.redirect(`${this.FRONTEND_HOST}/email-code-expired`)
			throw new BadRequestException("Code has expired")
		}

		await this.authCommandRepository.confirmUserEmail({ userId: emailConfirmCode.userID })
		await this.authCommandRepository.deactivateAllEmailCodes({
			userID: emailConfirmCode.userID
		})

		res.redirect(`${this.FRONTEND_HOST}/email-code-success`)
	}
}
