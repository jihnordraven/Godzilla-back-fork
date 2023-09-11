import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { EmailCode, GoogleProfile, Sessions, User } from "@prisma/client"

@Injectable()
export class AuthQueryRepository {
	constructor(private readonly prisma: PrismaService) {}

	public async checkIsUniqueUsername({ username }: { username: string }): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { username } }))
	}

	public async checkIsUniqueEmail({ email }: { email: string }): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { email } }))
	}

	async findUniqueUserByID({ userID }: { userID: string }): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id: userID } })
	}

	async findUniqueUserByEmail({ email }: { email: string }): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	async findUniqueEmailCodeByCode({ code }: { code: string }): Promise<EmailCode | null> {
		const emailCode: EmailCode | null = await this.prisma.emailCode.findUnique({
			where: { code }
		})
		if (!emailCode) throw new NotFoundException("Code not found")
		return emailCode
	}

	async findUniqueSessionByID({ sessionID }: { sessionID: string }): Promise<Sessions | null> {
		return this.prisma.sessions.findUnique({ where: { id: sessionID } })
	}

	public async findUniqueGoogleProfileByProviderID({
		providerID
	}: {
		providerID: string
	}): Promise<GoogleProfile | null> {
		return this.prisma.googleProfile.findUnique({ where: { providerID } })
	}

	public async findUniqueGoogleProfileByUserID({
		userID
	}: {
		userID: string
	}): Promise<GoogleProfile | null> {
		return this.prisma.googleProfile.findUnique({ where: { userID } })
	}
}
