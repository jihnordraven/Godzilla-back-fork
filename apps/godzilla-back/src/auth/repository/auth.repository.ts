import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {
	AuthObjectType,
	CreateEmailCodeType,
	GoogleRegisterType,
	LocalRegisterType
} from "../core/models"
import { EmailConfirmCode, GoogleProfile, Sessions, User } from "@prisma/client"
import { red } from "colorette"
import { v4 } from "uuid"
import { add } from "date-fns"

@Injectable()
export class AuthRepository {
	private readonly logger: Logger = new Logger(AuthRepository.name)
	private readonly clientsCounter = 0

	constructor(protected prisma: PrismaService) {}

	async localRegister(data: LocalRegisterType): Promise<User> {
		console.log(data)
		const user: User | void = await this.prisma.user
			.create({
				data: {
					email: data.email,
					username: data.username,
					hashPassword: data.hashPassword ? data.hashPassword : ""
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!user) throw new InternalServerErrorException("Unable to create user")
		return user
	}

	async createEmailCode({ userId }: CreateEmailCodeType): Promise<EmailConfirmCode> {
		const emailCode: EmailConfirmCode | void = await this.prisma.emailConfirmCode
			.create({
				data: {
					code: v4(),
					exp: add(new Date(), { minutes: 10 }),
					userId
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!emailCode)
			throw new InternalServerErrorException("Unable to create email code")
		return emailCode
	}

	async findOneCodeByCode({
		code
	}: {
		code: string
	}): Promise<EmailConfirmCode | null> {
		return this.prisma.emailConfirmCode.findUnique({ where: { code } })
	}

	async findUniqueUserById({ userId }: { userId: string }): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id: userId } })
	}

	async deactivateAllEmailCodes({ userId }: { userId: string }): Promise<void> {
		await this.prisma.emailConfirmCode.updateMany({
			where: { userId },
			data: { isUsed: true }
		})
	}

	async findUserToEmail({ email }: { email: string }): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: { email }
		})
	}

	async createNewPassword({
		userId,
		hashPassword
	}: {
		userId: string
		hashPassword: string
	}): Promise<boolean> {
		return Boolean(
			await this.prisma.user.update({
				where: { id: userId },
				data: { hashPassword }
			})
		)
	}

	async addNewSession(
		authObject: AuthObjectType,
		expiresTime: string
	): Promise<Sessions> {
		const _session: Sessions = await this.prisma.sessions.findFirst({
			where: {
				userIP: authObject.userIP,
				userAgent: authObject.userAgent,
				userOwnerId: authObject.userID
			}
		})
		const userAgent: string = _session?.userAgent ?? ""

		return this.prisma.sessions.upsert({
			where: { userAgent },
			update: {
				expires: expiresTime
			},
			create: {
				userIP: authObject.userIP,
				userAgent: authObject.userAgent,
				expires: expiresTime,
				userOwnerId: authObject.userID
			}
		})
	}

	async findUserToId(userId: string): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: { id: userId }
		})
	}

	async findActiveSession(sessionId: string): Promise<Sessions | null> {
		return await this.prisma.sessions.findUnique({ where: { id: sessionId } })
	}

	async deleteSession(sessionId: string) {
		await this.prisma.sessions.delete({ where: { id: sessionId } })
	}

	public async generateClientUsername(): Promise<string> {
		const id = v4()
		const username: string = `client-${id.substring(0, 8)}`
		const isUsernameUnique: boolean = await this.checkUniqueUsername({ username })

		if (isUsernameUnique) {
			return this.generateClientUsername()
		} else {
			return username
		}
	}

	public async checkUniqueUsername({
		username = ""
	}: {
		username: string
	}): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { username } }))
	}

	public async checkUniqueEmail({ email }: { email: string }): Promise<boolean> {
		return Boolean(await this.prisma.user.findUnique({ where: { email } }))
	}

	public async googleRegister(dto: GoogleRegisterType): Promise<GoogleProfile> {
		return this.prisma.googleProfile.create({
			data: {
				providerId: dto.providerId,
				email: dto.email,
				username: dto.username,
				provider: dto.provider,
				displayName: dto.displayName || null,
				userId: dto.userId
			}
		})
	}

	public async confirmUserEmail({ userId }: { userId: string }): Promise<void> {
		await this.prisma.user.update({
			where: { id: userId },
			data: { isConfirmed: true }
		})
	}

	public async findOneGoogleProfileByUserID({
		userID
	}: {
		userID: string
	}): Promise<GoogleProfile | null> {
		return this.prisma.googleProfile.findUnique({ where: { userId: userID } })
	}

	public async findUniqueGoogleProfileByProviderId({
		providerId
	}: {
		providerId: string
	}) {
		return this.prisma.googleProfile.findUnique({ where: { providerId } })
	}
}
