import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { User } from "@prisma/client"
import { MeInfoType } from "../core/models"

@Injectable()
export class AuthQueryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async meInfo({ userID }: { userID: string }): Promise<MeInfoType> {
		const user: User | null = await this.prisma.user.findUnique({ where: { id: userID } })
		if (!user) throw new NotFoundException("User not found")
		const meInfo: MeInfoType = {
			email: user.email,
			username: user.username,
			userID: user.id
		}
		return meInfo
	}
}
