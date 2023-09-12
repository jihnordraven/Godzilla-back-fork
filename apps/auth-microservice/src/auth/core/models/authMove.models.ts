export type AuthObjectType = {
	userIP: string
	userAgent: string
	userID: string
}

export type TokensObjectType = {
	accessToken: string
	refreshToken: string
}

export type CreateGoogleProfileType = {
	providerID: string
	name?: string | null
	givenName?: string | null
	familyName?: string | null
	picture?: string | null
	email: string
	isConfirmed: boolean
	locale?: string | null
	userID: string
}

export type CreateGithubProfileType = {
	readonly login: string
	readonly node_id?: string
	readonly username: string
	readonly avatar_url?: string | null
	readonly name?: string | null
	readonly location?: string | null
	readonly email?: string | null
	readonly userID: string
}
