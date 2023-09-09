import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateUserDto } from "../../core/dto"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { User } from "@prisma/client"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { HttpStatus } from "@nestjs/common"
import { HandleException } from "libs/errors-handlers"
import { BcryptAdapter } from "apps/auth-microservice/src/adapters"

export class LocalRegisterCommand {
	constructor(public readonly createUser: CreateUserDto) {}
}

@CommandHandler(LocalRegisterCommand)
export class LocalRegisterHandler implements ICommandHandler<LocalRegisterCommand> {
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository,
		protected readonly bcryptAdapter: BcryptAdapter,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({
		createUser: { email, username, password }
	}: LocalRegisterCommand): Promise<void> {
		const isEmail: boolean = await this.authQueryRepository.checkIsUniqueEmail({ email })
		if (isEmail)
			HandleException({
				message: "User with this email is already registered",
				field: "email",
				error: "Conflict",
				statusCode: HttpStatus.CONFLICT
			})

		const isUsername: boolean = await this.authQueryRepository.checkIsUniqueUsername({
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

		const user: User = await this.authCommandRepository.localRegister({
			email,
			username,
			hashPassword
		})

		const code: string = await this.authCommandRepository.createEmailCode({
			userID: user.id
		})

		await this.mailerAdapter.sendConfirmCode({ email, code })
	}
}
