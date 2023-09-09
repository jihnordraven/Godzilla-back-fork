import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { AuthQueryRepository } from "../../repositories"
import { MeInfoType } from "../../core/models"
import { NotFoundException } from "@nestjs/common"
import { User } from "@prisma/client"

export class MeInfoQuery {
	constructor(public readonly data: { userID: string }) {}
}

@QueryHandler(MeInfoQuery)
export class MeInfoHandler implements IQueryHandler<MeInfoQuery> {
	constructor(protected readonly authQueryRepository: AuthQueryRepository) {}
	async execute({ data: { userID } }: MeInfoQuery): Promise<MeInfoType> {
		const user: User | null = await this.authQueryRepository.findUniqueUserByID({ userID })

		if (!user) throw new NotFoundException("User not found")

		return {
			userId: user.id,
			username: user.username,
			email: user.email
		}
	}
}
