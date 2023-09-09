import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {
	AuthObjectType,
	CreateEmailCodeType,
	CreateGoogleProfileType,
	LocalRegisterType
} from "../core/models"
import {
	ConfirmEmailStatusEnum,
	EmailConfirmCode,
	GoogleProfile,
	PasswordRecoveryCode,
	Sessions,
	User
} from "@prisma/client"
import { red } from "colorette"
import { v4 } from "uuid"
import { add } from "date-fns"

@Injectable()
export class AuthCommandRepository {
	private readonly logger: Logger = new Logger(AuthCommandRepository.name)

	constructor(protected prisma: PrismaService) {}

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
		const emailCode: EmailConfirmCode | void = await this.prisma.emailConfirmCode
			.create({
				data: {
					code: v4(),
					exp: add(new Date(), { minutes: 10 }),
					userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!emailCode) throw new InternalServerErrorException("Unable to create new Email Code")
		return emailCode.code
	}

	async deactivateAllEmailCodes({ userID }: { userID: string }): Promise<void> {
		await this.prisma.emailConfirmCode.updateMany({
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

	public async googleRegister(dto: CreateGoogleProfileType): Promise<GoogleProfile> {
		const googleProfile: GoogleProfile | void = await this.prisma.googleProfile
			.create({
				data: {
					providerID: dto.providerID,
					email: dto.email,
					username: dto.username,
					provider: dto.provider,
					displayName: dto.displayName || null,
					userID: dto.userID
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!googleProfile)
			throw new InternalServerErrorException("Unable to create new Google Profile")
		return googleProfile
	}

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
				data: dto
			})
			.catch((err) => this.logger.error(red(err)))
		if (googleProfile) {
			return googleProfile
		} else {
			throw new InternalServerErrorException("Unable to create google profile")
		}
	}

	public async createPasswordRecoveryCode({
		userID
	}: {
		userID: string
	}): Promise<PasswordRecoveryCode> {
		const passwordRecoveryCode: PasswordRecoveryCode | void =
			await this.prisma.passwordRecoveryCode
				.create({
					data: {
						code: v4(),
						exp: add(new Date(), { minutes: 10 }),
						userID
					}
				})
				.catch((err: string) => this.logger.error(red(err)))
		if (!passwordRecoveryCode)
			throw new InternalServerErrorException("Unable to create new Password Recovery Code")
		return passwordRecoveryCode
	}

	public async deactivateAllPasswordRecoveryCodes({
		userID
	}: {
		userID: string
	}): Promise<boolean> {
		return Boolean(
			await this.prisma.passwordRecoveryCode.updateMany({
				where: { userID },
				data: { isUsed: true }
			})
		)
	}
}
