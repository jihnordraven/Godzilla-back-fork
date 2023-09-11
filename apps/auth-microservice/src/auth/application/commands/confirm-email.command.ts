import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ConfirmEmailStatusEnum, EmailCode, User } from "@prisma/client"
import { AuthCommandRepository } from "../../repositories/auth-command.repository"
import { Response } from "express"
import { AuthQueryRepository } from "../../repositories"
import { CONFIG } from "apps/auth-microservice/src/config"

export class ConfirmEmailCommand {
	constructor(public readonly dto: { code: string; res: Response }) {}
}

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler implements ICommandHandler<ConfirmEmailCommand> {
	constructor(
		private readonly authCommandRepository: AuthCommandRepository,
		private readonly authQueryRepository: AuthQueryRepository
	) {}

	private readonly FRONTEND_HOST: string = CONFIG.FRONTEND_HOST

	async execute({ dto: { code, res } }: ConfirmEmailCommand): Promise<void> {
		const emailCode: EmailCode | null =
			await this.authQueryRepository.findUniqueEmailCodeByCode({ code })

		const user: User | null = await this.authQueryRepository.findUniqueUserByID({
			userID: emailCode.userID
		})
		if (user.isConfirmed === ConfirmEmailStatusEnum.CONFIRMED) {
			res.redirect(`${this.FRONTEND_HOST}`)
			return null
		}

		if (emailCode.isUsed) {
			res.redirect(`${this.FRONTEND_HOST}`)
			return null
		}

		const isCodeExpired: boolean = new Date(emailCode.expiresIn) <= new Date()
		if (isCodeExpired) {
			await this.authCommandRepository.deactivateOneEmailCode({ code })
			res.redirect(`${this.FRONTEND_HOST}/auth/expired/${emailCode.code}`)
			return null
		}

		await this.authCommandRepository.confirmUserEmail({ userId: emailCode.userID })
		await this.authCommandRepository.deactivateOneEmailCode({ code })

		res.redirect(`${this.FRONTEND_HOST}/auth/confirm`)
		return null
	}
}
