import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { EmailCode } from "@prisma/client"
import { AuthCommandRepository } from "../../repositories/auth-command.repository"
import { ConfigService } from "@nestjs/config"
import { BadRequestException } from "@nestjs/common"
import { AuthQueryRepository } from "../../repositories"
import { CONFIG } from "apps/auth-microservice/src/config"
import { PasswordRecoveryConfirmDto } from "../../core/dto"

export class PasswordRecoveryConfirmCommand {
	constructor(public readonly dto: PasswordRecoveryConfirmDto) {}
}

@CommandHandler(PasswordRecoveryConfirmCommand)
export class ConfirmPasswordRecoveryHandler
	implements ICommandHandler<PasswordRecoveryConfirmCommand>
{
	constructor(
		protected readonly config: ConfigService,
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository
	) {}

	private FRONTEND_HOST: string = CONFIG.FRONTEND_HOST

	public async execute({ dto: { code, res } }: PasswordRecoveryConfirmCommand): Promise<void> {
		const emailCode: EmailCode | null =
			await this.authQueryRepository.findUniqueEmailCodeByCode({ code })

		if (emailCode.isUsed) {
			await this.authCommandRepository.deactivateOneEmailCode({ code })
			res.redirect(`${this.FRONTEND_HOST}/recovery`)
			return null
		}

		const isCodeExpired: boolean = new Date(emailCode.expiresIn) <= new Date()
		if (isCodeExpired) {
			await this.authCommandRepository.deactivateOneEmailCode({
				code: emailCode.code
			})
			res.redirect(`${this.FRONTEND_HOST}/auth/expired/${emailCode.code}`)
			throw new BadRequestException("Code has expired")
		}

		res.redirect(`${this.FRONTEND_HOST}/auth/recovery/${emailCode.code}`)
	}
}
