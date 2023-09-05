import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SessionsBaseType, UserBaseType } from '../../../../../library/models'
import { AuthObjectType, CreateEmailCodeType, LocalRegisterType } from '../core/models'
import { ConfirmUser, User } from '@prisma/client'
import { red } from 'colorette'
import { v4 } from 'uuid'
import { add } from 'date-fns'

@Injectable()
export class AuthRepository {
	private readonly logger: Logger = new Logger(AuthRepository.name)

	constructor(protected prisma: PrismaService) {}

	async localRegister(data: LocalRegisterType): Promise<User> {
		const user: User | void = await this.prisma.user
			.create({
				data: {
					email: data.email,
					username: data.username,
					hushPass: data.hashPassword
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!user) throw new InternalServerErrorException('Unable to create user')
		return user
	}

	async createEmailCode(data: CreateEmailCodeType): Promise<ConfirmUser> {
		const emailCode: ConfirmUser | void = await this.prisma.confirmUser
			.create({
				data: {
					codeActivated: v4(),
					codeActivatedExpired: add(new Date(), { minutes: 10 }).toString(),
					userOwnerId: data.userId
				}
			})
			.catch((err: string) => this.logger.error(red(err)))
		if (!emailCode)
			throw new InternalServerErrorException('Unable to create email code')
		return emailCode
	}

	async findOneEmailCodeByCode({
		code
	}: {
		code: string
	}): Promise<ConfirmUser | null> {
		return this.prisma.confirmUser.findUnique({ where: { codeActivated: code } })
	}

	async deactivateAllEmailCodes({ userId }: { userId: string }): Promise<void> {
		await this.prisma.confirmUser.updateMany({
			where: { userOwnerId: userId },
			data: { isActive: false }
		})
	}

	async findUserToEmail(email: string): Promise<UserBaseType | null> {
		return await this.prisma.user.findUnique({
			where: { email }
		})
	}

	async addNewSession(
		authObject: AuthObjectType,
		expiresTime: string
	): Promise<SessionsBaseType> {
		return await this.prisma.sessions.create({
			data: {
				ip: authObject.ip,
				title: authObject.nameDevice,
				sessionExpired: expiresTime,
				userOwnerId: authObject.userID
			}
		})
	}
}
