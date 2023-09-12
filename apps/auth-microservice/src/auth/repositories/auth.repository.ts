import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {
	AuthObjectType,
	CreateEmailCodeType,
	CreateGithubProfileType,
	CreateGoogleProfileType,
	LocalRegisterType
} from "../core/models"
import {
	ConfirmEmailStatusEnum,
	EmailCode,
	GithubProfile,
	GoogleProfile,
	Sessions,
	User
} from "@prisma/client"
import { red } from "colorette"
import { v4 } from "uuid"
import { add } from "date-fns"

@Injectable()
export class AuthRepository {
	private readonly logger: Logger = new Logger(AuthRepository.name)

	constructor(protected readonly prisma: PrismaService) {}

	async localRegister(data: LocalRegisterType): Promise<User> {
		const user: User | void = await this.prisma.user
			.create({
				data: {
					email: data.email,
					username: data.username,
					hashPassword: data.hashPassword ? data.hashPassword : ""
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!user) throw new InternalServerErrorException("Unable to create new User")
		return user
	}

	async createEmailCode({ userID }: CreateEmailCodeType): Promise<string> {
		const emailCode: EmailCode | void = await this.prisma.emailCode
			.create({
				data: {
					code: v4(),
					expiresIn: add(new Date(), { minutes: 5 }),
					userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!emailCode) throw new InternalServerErrorException("Unable to create new Email Code")
		return emailCode.code
	}

	public async deactivateOneEmailCode({ code }: { code: string }): Promise<void> {
		await this.prisma.emailCode.update({ where: { code }, data: { isUsed: true } })
	}

	async deactivateManyEmailCodes({ userID }: { userID: string }): Promise<void> {
		await this.prisma.emailCode.updateMany({
			where: { userID },
			data: { isUsed: true }
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

	async addNewSession(authObject: AuthObjectType, expiresTime: string): Promise<Sessions> {
		const session: Sessions | void = await this.prisma.sessions
			.create({
				data: {
					userIP: authObject.userIP,
					userAgent: authObject.userAgent,
					expires: expiresTime,
					userID: authObject.userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!session) throw new InternalServerErrorException("Unable to create new Session")
		return session
	}

	async deleteSession({ sessionID }: { sessionID: string }): Promise<boolean> {
		return Boolean(await this.prisma.sessions.delete({ where: { id: sessionID } }))
	}

	// public async googleRegister(dto: CreateGoogleProfileType): Promise<GoogleProfile> {
	// 	const googleProfile: GoogleProfile | void = await this.prisma.googleProfile
	// 		.create({
	// 			data: {
	// 				providerID: dto.providerID,
	// 				email: dto.email,
	// 				username: dto.username,
	// 				provider: dto.provider,
	// 				displayName: dto.displayName || null,
	// 				userID: dto.userID
	// 			}
	// 		})
	// 		.catch((err: string) => this.logger.error(red(err)))
	// 	if (!googleProfile)
	// 		throw new InternalServerErrorException("Unable to create new Google Profile")
	// 	return googleProfile
	// }

	public async confirmUserEmail({ userId }: { userId: string }): Promise<boolean> {
		return Boolean(
			await this.prisma.user.update({
				where: { id: userId },
				data: { isConfirmed: ConfirmEmailStatusEnum.CONFIRMED }
			})
		)
	}

	public async createGoogleProfile(dto: CreateGoogleProfileType): Promise<GoogleProfile> {
		const googleProfile: GoogleProfile | void = await this.prisma.googleProfile
			.create({
				data: {
					providerID: dto.providerID,
					email: dto.email,
					familyName: dto.familyName,
					givenName: dto.givenName,
					name: dto.name,
					picture: dto.picture,
					isConfirmed: dto.isConfirmed,
					locale: dto.locale,
					userID: dto.userID
				}
			})
			.catch((err) => this.logger.error(red(err)))
		if (googleProfile) {
			return googleProfile
		} else {
			throw new InternalServerErrorException("Unable to create google profile")
		}
	}

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

	public async findUniqueGithubProfileByProviderID({
		providerID
	}: {
		providerID: string
	}): Promise<GithubProfile | null> {
		return this.prisma.githubProfile.findUnique({ where: { providerID } })
	}

	public async findUniqueGithubProfileByUserID({
		userID
	}: {
		userID: string
	}): Promise<GithubProfile | null> {
		return this.prisma.githubProfile.findUnique({ where: { userID } })
	}

	public async createGithubProfile(data: CreateGithubProfileType): Promise<GithubProfile> {
		const githubProfile: GithubProfile | void = await this.prisma.githubProfile
			.create({
				data: {
					providerID: data.node_id,
					email: data.email,
					username: data.login,
					location: data.location,
					name: data.name,
					userID: data.userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!githubProfile)
			throw new InternalServerErrorException("Unable to create github profile")
		return githubProfile
	}

	// helpers
	public async genUniqueUsername({ pref }: { pref: string }): Promise<string> {
		let isUsernameTaken: boolean
		let uniqueUsername: string = pref
		let suffix: number = 1
		do {
			isUsernameTaken = await this.checkIsUniqueUsername({
				username: uniqueUsername
			})
			if (isUsernameTaken) {
				uniqueUsername = `${pref}-${suffix}`
				suffix++
			}
		} while (isUsernameTaken)
		return uniqueUsername
	}
}
