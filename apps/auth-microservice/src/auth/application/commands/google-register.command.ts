import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { AuthRepository } from "../../repositories/auth.repository"
import { GoogleProfile, User } from "@prisma/client"
import { CreateGoogleProfileType } from "../../core/models"
import { GoogleRegisterDto } from "../../core/dto/google-register.dto"

export class GoogleRegisterCommand {
	constructor(public readonly dto: GoogleRegisterDto) {}
}

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler implements ICommandHandler<GoogleRegisterCommand> {
	constructor(protected readonly authRepository: AuthRepository) {}

	public async execute({ dto }: GoogleRegisterCommand): Promise<GoogleProfile> {
		// helpers
		const createGoogleProfileData = ({
			userID
		}: {
			userID: string
		}): CreateGoogleProfileType => {
			return {
				providerID: dto.sub,
				email: dto.email,
				name: dto.name,
				givenName: dto.given_name,
				familyName: dto.family_name,
				picture: dto.picture,
				isConfirmed: dto.email_verified,
				locale: dto.locale,
				userID
			}
		}
		// helpers
		const googleProfile: GoogleProfile | null =
			await this.authRepository.findUniqueGoogleProfileByProviderID({
				providerID: dto.sub
			})

		if (googleProfile) return googleProfile

		const user: User | null = await this.authRepository.findUniqueUserByEmail({
			email: dto.email
		})

		const uniqueUsername: string = await this.authRepository.genUniqueUsername({
			pref: "google-"
		})

		if (user) {
			const googleProfile: GoogleProfile | null =
				await this.authRepository.findUniqueGoogleProfileByUserID({ userID: user.id })
			if (googleProfile) return googleProfile
			const googleProfileData: CreateGoogleProfileType = createGoogleProfileData({
				userID: user.id
			})
			return this.authRepository.createGoogleProfile(googleProfileData)
		} else {
			const newUser: User = await this.authRepository.localRegister({
				email: dto.email,
				username: uniqueUsername
			})
			const googleProfileData: CreateGoogleProfileType = createGoogleProfileData({
				userID: newUser.id
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
