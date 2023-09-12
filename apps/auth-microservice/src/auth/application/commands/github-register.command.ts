import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { GithubRegisterDto } from "../../core/dto/github-register.dto"
import { AuthRepository } from "../../repositories"
import { GithubProfile, User } from "@prisma/client"
import { ForbiddenException } from "@nestjs/common"
import { CreateGithubProfileType } from "../../core/models"
import { AuthService } from "../auth.service"

export class GithubRegisterCommand {
	constructor(public readonly dto: GithubRegisterDto) {}
}

@CommandHandler(GithubRegisterCommand)
export class GithubRegisterHandler implements ICommandHandler<GithubRegisterCommand> {
	constructor(
		protected readonly authRepository: AuthRepository,
		protected readonly authService: AuthService
	) {}

	async execute({ dto }: GithubRegisterCommand): Promise<GithubProfile> {
		if (!dto.email) throw new ForbiddenException("Unable to register with github without email")
		//helpers
		const createGithubProfileData = ({
			userID,
			username
		}: {
			userID: string
			username: string
		}): CreateGithubProfileType => {
			return {
				node_id: dto.node_id,
				email: dto.email,
				avatar_url: dto.avatar_url,
				location: dto.location,
				name: dto.name,
				login: dto.login,
				username,
				userID
			}
		}
		//helpers

		const githubProfile: GithubProfile | null =
			await this.authRepository.findUniqueGithubProfileByProviderID({
				providerID: dto.node_id
			})

		if (githubProfile) return githubProfile

		const user: User | null = await this.authRepository.findUniqueUserByEmail({
			email: dto.email
		})

		const uniqueUsername = dto.login
			? await this.authRepository.genUniqueUsername({ pref: `${dto.login}-` })
			: await this.authRepository.genUniqueUsername({ pref: "github-" })

		if (user) {
			const githubProfile: GithubProfile | null =
				await this.authRepository.findUniqueGithubProfileByUserID({ userID: user.id })

			if (githubProfile) return githubProfile

			const githubProfileData: CreateGithubProfileType = createGithubProfileData({
				userID: user.id,
				username: uniqueUsername
			})
			return this.authRepository.createGithubProfile(githubProfileData)
		} else {
			const newUser: User | null = await this.authRepository.localRegister({
				email: dto.email,
				username: uniqueUsername
			})
			const githubProfileData: CreateGithubProfileType = createGithubProfileData({
				userID: newUser.id,
				username: uniqueUsername
			})
			return this.authRepository.createGithubProfile(githubProfileData)
		}
	}
}
