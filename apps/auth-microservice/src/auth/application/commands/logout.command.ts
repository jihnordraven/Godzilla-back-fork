import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthCommandRepository, AuthQueryRepository } from "../../repositories"
import { ForbiddenException, NotFoundException } from "@nestjs/common"
import { Sessions } from "@prisma/client"
import { LogoutDto } from "../../core/dto"

export class LogoutCommand {
	constructor(public readonly data: LogoutDto) {}
}

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	constructor(
		protected readonly authCommandRepository: AuthCommandRepository,
		protected readonly authQueryRepository: AuthQueryRepository
	) {}
	async execute({ data: { userID, sessionID } }: LogoutCommand) {
		const session: Sessions | null = await this.authQueryRepository.findUniqueSessionByID({
			sessionID
		})

		if (!session) throw new NotFoundException("Session not found")

		if (session.userID !== userID) throw new ForbiddenException("Invalid session")

		await this.authCommandRepository.deleteSession({ sessionID })
	}
}
