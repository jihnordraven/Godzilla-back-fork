import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { IGoogleUser } from "../../guards-handlers/strategies"
import { AuthRepository } from "../../repository/auth.repository"
import { GoogleProfile, User } from "@prisma/client"

export class GoogleRegisterCommand {
	constructor(public readonly dto: IGoogleUser) {}
}

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler implements ICommandHandler<GoogleRegisterCommand> {
	constructor(protected readonly authRepository: AuthRepository) {}

	async execute({ dto }: GoogleRegisterCommand): Promise<GoogleProfile> {
		const isGoogleProfile: GoogleProfile =
			await this.authRepository.findUniqueGoogleProfileByProviderId({
				providerId: dto.providerId
			})
		// google profile doesn't exist
		if (!isGoogleProfile) {
			const isUser: User | null = await this.authRepository.findUserToEmail({
				email: dto.email
			})
			// user doesn\t exist
			if (!isUser) {
				const isUsernameTaken = await this.authRepository.checkUniqueUsername({
					username: dto.username || ""
				})
				if (!isUsernameTaken) {
					const username = dto.username
						? dto.username
						: await this.authRepository.generateClientUsername()
					const user: User = await this.authRepository.localRegister({
						email: dto.email,
						username
					})
					const googleProfile: GoogleProfile =
						await this.authRepository.googleRegister({
							email: dto.email,
							username,
							providerId: dto.providerId,
							provider: dto.provider,
							displayName: dto.displayName,
							userId: user.id
						})
					return googleProfile
				} else {
					const username = dto.username
						? dto.username
						: await this.authRepository.generateClientUsername()
					const user: User = await this.authRepository.localRegister({
						email: dto.email,
						username: username,
						hashPassword: ""
					})
					const googleProfile: GoogleProfile =
						await this.authRepository.googleRegister({
							email: dto.email,
							username,
							providerId: dto.providerId,
							provider: dto.provider,
							displayName: dto.displayName,
							userId: user.id
						})
					return googleProfile
				}
			}
			// user doesn't exist
			const username = dto.username
				? dto.username
				: await this.authRepository.generateClientUsername()
			const googleProfile: GoogleProfile = await this.authRepository.googleRegister(
				{
					email: dto.email,
					username,
					providerId: dto.providerId,
					provider: dto.provider,
					displayName: dto.displayName,
					userId: isUser.id
				}
			)
			return googleProfile
		}
		// google profile doesn't exist

		return isGoogleProfile

		// const user: User | null = await this.authRepository.findUserToEmail({
		// 	email: dto.email
		// })
		// if (!user) {
		// }
		// if (isUser) {
		// 	const isGoogleProfile: GoogleProfile | null =
		// 		await this.authRepository.findOneGoogleProfileByUserID({
		// 			userID: isUser.id
		// 		})
		// 	if (!isGoogleProfile) {
		// 		const googleProfile: GoogleProfile =
		// 			await this.authRepository.googleRegister({
		// 				providerId: dto.providerId,
		// 				email: dto.email,
		// 				username: dto.username,
		// 				displayName: dto.displayName || null,
		// 				provider: dto.provider,
		// 				userId: isUser.id
		// 			})
		// 	}
		// 	return isGoogleProfile
		// }
		// if (!dto.username) {
		// 	const username: string = await this.authRepository.generateClientUsername()
		// 	const user: User = await this.authRepository.localRegister({
		// 		email: dto.email,
		// 		username
		// 	})
		// 	const googleProfile: GoogleProfile = await this.authRepository.googleRegister(
		// 		{
		// 			providerId: dto.providerId,
		// 			email: dto.email,
		// 			username,
		// 			displayName: dto.displayName || null,
		// 			provider: dto.provider,
		// 			userId: user.id
		// 		}
		// 	)
		// 	await this.authRepository.confirmUserEmail({ userId: user.id })
		// 	return googleProfile
		// } else {
		// 	const user: User = await this.authRepository.localRegister({
		// 		email: dto.email,
		// 		username: dto.username
		// 	})
		// 	const googleProfile: GoogleProfile = await this.authRepository.googleRegister(
		// 		{
		// 			providerId: dto.providerId,
		// 			email: dto.email,
		// 			username: dto.username,
		// 			displayName: dto.displayName || null,
		// 			provider: dto.provider,
		// 			userId: user.id
		// 		}
		// 	)
		// 	await this.authRepository.confirmUserEmail({ userId: user.id })
		// 	return googleProfile
		// }
	}
}
