import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateUserDto } from "../../core/dto"
import { AuthRepository } from "../../repository/auth.repository"
import { EmailConfirmCode, User } from "@prisma/client"
import { MailerAdapter } from "../../../adapters/mailer.adapter"
import { BcryptAdapter } from "apps/godzilla-back/src/adapters"
import { ConflictException } from "@nestjs/common"

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

	async execute({
		createUser: { email, username, password }
	}: LocalRegisterCommand): Promise<void> {
		const isEmail: boolean = await this.authRepository.checkUniqueEmail({ email })
		if (isEmail)
			throw new ConflictException("User with this email is already registered")

		const isUsername: boolean = await this.authRepository.checkUniqueUsername({
			username
		})
		if (isUsername)
			throw new ConflictException("User with this username is already registered")

		const hashPassword: string = await this.bcryptAdapter.hash({ password })

		const user: User = await this.authRepository.localRegister({
			email,
			username,
			hashPassword
		})

		const emailCode: EmailConfirmCode = await this.authRepository.createEmailCode({
			userId: user.id
		})

		await this.mailerAdapter.sendConfirmCode({ email, code: emailCode.code })
	}
}
