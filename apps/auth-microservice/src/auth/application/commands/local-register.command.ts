import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateUserDto } from "../../core/dto"
import { AuthRepository } from "../../repositories"
import { ConfirmEmailStatusEnum, User } from "@prisma/client"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { HttpStatus } from "@nestjs/common"
import { BcryptAdapter } from "apps/auth-microservice/src/adapters"
import { HandleException } from "libs/errors-handlers"

export class LocalRegisterCommand {
	constructor(public readonly createUser: CreateUserDto) {}
}

@CommandHandler(LocalRegisterCommand)
export class LocalRegisterHandler implements ICommandHandler<LocalRegisterCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly bcryptAdapter: BcryptAdapter,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	public async execute({
		createUser: { email, username, password }
	}: LocalRegisterCommand): Promise<void | string> {
		const isUser: User | null = await this.authRepository.findUniqueUserByEmail({ email })

		if (isUser && isUser.isConfirmed !== ConfirmEmailStatusEnum.CONFIRMED) {
			const code: string = await this.authRepository.createEmailCode({
				userID: isUser.id
			})
			await this.mailerAdapter.sendConfirmCode({ email, code })
			return null
		} else {
			const isEmail: boolean = await this.authRepository.checkIsUniqueEmail({ email })
			if (isEmail)
				HandleException({
					message: "User with this email is already registered",
					field: "email",
					error: "Conflict",
					statusCode: HttpStatus.CONFLICT
				})

			const isUsername: boolean = await this.authRepository.checkIsUniqueUsername({
				username
			})
			if (isUsername)
				HandleException({
					message: "User with this username is already registered",
					field: "username",
					error: "Conflict",
					statusCode: HttpStatus.CONFLICT
				})

			const hashPassword: string = await this.bcryptAdapter.hash({ password })

			const user: User = await this.authRepository.localRegister({
				email,
				username,
				hashPassword
			})

			const code: string = await this.authRepository.createEmailCode({
				userID: user.id
			})

			await this.mailerAdapter.sendConfirmCode({ email, code })
		}
	}
}
