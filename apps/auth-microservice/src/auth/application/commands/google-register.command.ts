import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { IGoogleUser } from "../../protection/strategies"
import { AuthRepository } from "../../repositories/auth.repository"
import { GoogleProfile, User } from "@prisma/client"
import { CreateGoogleProfileType } from "../../core/models"
import { AuthQueryRepository } from "../../repositories"

export class GoogleRegisterCommand {
	constructor(public readonly dto: IGoogleUser) {}
}

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler implements ICommandHandler<GoogleRegisterCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		private readonly authQueryRepository: AuthQueryRepository
	) {}

	public async execute({ dto }: GoogleRegisterCommand): Promise<GoogleProfile> {
		// helpers
		const createGoogleProfileData = ({
			userID,
			username
		}: {
			userID: string
			username: string
		}): CreateGoogleProfileType => {
			return {
				providerID: dto.providerID,
				email: dto.email,
				username,
				displayName: dto.displayName,
				provider: dto.provider,
				userID
			}
		}
		// helpers
		const googleProfile: GoogleProfile | null =
			await this.authRepository.findUniqueGoogleProfileByProviderID({
				providerID: dto.providerID
			})

		if (googleProfile) return googleProfile

		const user: User | null = await this.authRepository.findUniqueUserByEmail({
			email: dto.email
		})

		if (user) {
			const googleProfile: GoogleProfile | null =
				await this.authRepository.findUniqueGoogleProfileByUserID({ userID: user.id })
			if (googleProfile) return googleProfile
			const googleProfileData: CreateGoogleProfileType = createGoogleProfileData({
				userID: user.id,
				username: user.username
			})
			return this.authRepository.createGoogleProfile(googleProfileData)
		}
		if (dto.username) {
			let isUsernameTaken: boolean
			let uniqueUsername: string = dto.username
			let suffix: number = 1
			// check is username unique
			do {
				isUsernameTaken = await this.authRepository.checkIsUniqueUsername({
					username: uniqueUsername
				})
				if (isUsernameTaken) {
					uniqueUsername = `${dto.username}_${suffix}`
					suffix++
				}
			} while (isUsernameTaken)
			// check is username unique
			const user: User = await this.authRepository.localRegister({
				email: dto.email,
				username: uniqueUsername
			})
			const googleProfileData: CreateGoogleProfileType = createGoogleProfileData({
				userID: user.id,
				username: uniqueUsername
			})
			return this.authRepository.createGoogleProfile(googleProfileData)
		} else {
			let isUsernameTaken: boolean
			let uniqueUsername: string = "google-client_1"
			let suffix: number = 1
			// check is username unique
			do {
				isUsernameTaken = await this.authRepository.checkIsUniqueUsername({
					username: uniqueUsername
				})
				if (isUsernameTaken) {
					uniqueUsername = `google-client_${suffix}`
					suffix++
				}
			} while (isUsernameTaken)
			// check is username unique
			const user: User = await this.authRepository.localRegister({
				email: dto.email,
				username: uniqueUsername
			})
			const googleProfileData: CreateGoogleProfileType = createGoogleProfileData({
				userID: user.id,
				username: uniqueUsername
			})
			return this.authRepository.createGoogleProfile(googleProfileData)
		}
	}
	// 		email: dto.email
	// 	})
	// 	// user doesn\t exist
	// 	if (!isUser) {
	// 		const isUsernameTaken = await this.authRepository.checkUniqueUsername({
	// 			username: dto.username || ""
	// 		})
	// 		if (!isUsernameTaken) {
	// 			const username = dto.username
	// 				? dto.username
	// 				: await this.authRepository.generateClientUsername()
	// 			const user: User = await this.authRepository.localRegister({
	// 				email: dto.email,
	// 				username
	// 			})
	// 			const googleProfile: GoogleProfile = await this.authRepository.googleRegister({
	// 				email: dto.email,
	// 				username,
	// 				providerId: dto.providerId,
	// 				provider: dto.provider,
	// 				displayName: dto.displayName,
	// 				userId: user.id
	// 			})
	// 			return googleProfile
	// 		} else {
	// 			const username = dto.username
	// 				? dto.username
	// 				: await this.authRepository.generateClientUsername()
	// 			const user: User = await this.authRepository.localRegister({
	// 				email: dto.email,
	// 				username: username,
	// 				hashPassword: ""
	// 			})
	// 			const googleProfile: GoogleProfile = await this.authRepository.googleRegister({
	// 				email: dto.email,
	// 				username,
	// 				providerId: dto.providerId,
	// 				provider: dto.provider,
	// 				displayName: dto.displayName,
	// 				userId: user.id
	// 			})
	// 			return googleProfile
	// 		}
	// 	}
	// 	// user doesn't exist
	// 	const username = dto.username
	// 		? dto.username
	// 		: await this.authRepository.generateClientUsername()
	// 	const googleProfile: GoogleProfile = await this.authRepository.googleRegister({
	// 		email: dto.email,
	// 		username,
	// 		providerId: dto.providerId,
	// 		provider: dto.provider,
	// 		displayName: dto.displayName,
	// 		userId: isUser.id
	// 	})
	// 	return googleProfile
	// }

	// return isGoogleProfile
}
