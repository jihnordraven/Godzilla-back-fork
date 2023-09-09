import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {
	EmailConfirmCode,
	GoogleProfile,
	PasswordRecoveryCode,
	Sessions,
	User
} from "@prisma/client"

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

	async findUniqueEmailCodeByCode({ code }: { code: string }): Promise<EmailConfirmCode | null> {
		return this.prisma.emailConfirmCode.findUnique({ where: { code } })
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

	public async findUniquePasswordRecoveryCodeByCode({
		code
	}: {
		code: string
	}): Promise<PasswordRecoveryCode | null> {
		return this.prisma.passwordRecoveryCode.findUnique({ where: { code } })
	}
}
