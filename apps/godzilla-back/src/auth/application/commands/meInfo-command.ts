import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AuthRepository } from '../../repository/auth.repository'
import { MeInfoType } from '../../core/models'
import { UserBaseType } from '../../../../../../library/models'
import { NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'

export class MeInfoCommand {
	constructor(public readonly userId: string) {}
}

@CommandHandler(MeInfoCommand)
export class MeInfoUseCase implements ICommandHandler<MeInfoCommand> {
	constructor(protected authRepository: AuthRepository) {}
	async execute(command: MeInfoCommand): Promise<MeInfoType> {
		const { userId } = command

		const user: User | null = await this.authRepository.findUserToId(userId)

		if (!user) {
			throw new NotFoundException()
		}

		return {
			userId: user.id,
			username: user.username,
			email: user.email
		}
	}
}
