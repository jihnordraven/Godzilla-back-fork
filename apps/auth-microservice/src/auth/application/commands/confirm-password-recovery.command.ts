import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { PasswordRecoveryCode } from "@prisma/client"
import { AuthCommandRepository } from "../../repositories/auth-command.repository"
import { Response } from "express"
import { ConfigService } from "@nestjs/config"
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common"
import { AuthQueryRepository } from "../../repositories"

export class ConfirmPasswordRecoveryCommand {
	constructor(public readonly dto: { code: string; res: Response }) {}
}

@CommandHandler(ConfirmPasswordRecoveryCommand)
export class ConfirmPasswordRecoveryHandler
	implements ICommandHandler<ConfirmPasswordRecoveryCommand>
{
	constructor(
		protected readonly config: ConfigService,
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository
	) {}

	private FRONTEND_HOST: string = this.config.get<string>("FRONTEND_HOST")

	public async execute({ dto: { code, res } }: ConfirmPasswordRecoveryCommand): Promise<void> {
		const isCode: PasswordRecoveryCode | null =
			await this.authQueryRepository.findUniquePasswordRecoveryCodeByCode({ code })
		if (!isCode) {
			res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-not-found`)
			throw new NotFoundException("Code not found")
		}

		if ((isCode.isUsed = true)) {
			await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({
				userID: isCode.userID
			})
			res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-already-used`)
			throw new ConflictException("This code has already been used")
		}

		const isCodeExpired: boolean = new Date(isCode.exp) <= new Date()
		if (isCodeExpired) {
			await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({
				userID: isCode.userID
			})
			res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-expired`)
			throw new BadRequestException("Code has expired")
		}

		res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-success/code=${isCode.code}`)
	}
}
