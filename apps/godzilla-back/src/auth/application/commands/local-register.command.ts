import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserDto } from '../../core/dto'
import { AuthRepository } from '../../repository/auth.repository'
import { BcryptAdapter } from '../../../adapters'
import { ConfirmUser, User } from '@prisma/client'
import { MailerAdapter } from '../../../adapters/mailer.adapter'

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
		const hashPassword: string = await this.bcryptAdapter.hushGenerate(password)

		const user: User = await this.authRepository.localRegister({
			email,
			username,
			hashPassword
		})

		const emailCode: ConfirmUser = await this.authRepository.createEmailCode({
			userId: user.id
		})

		await this.mailerAdapter.sendConfirmCode({ email, code: emailCode.codeActivated })
	}
}
