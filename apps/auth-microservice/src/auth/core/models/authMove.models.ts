export type AuthObjectType = {
	userIP: string
	userAgent: string
	userID: string
}

export type TokensObjectType = {
	refreshToken: string
	accessToken: string
}

export type CreateGoogleProfileType = {
	providerID: string
	username: string
	email: string
	displayName: string | null
	provider: string
	userID: string
}
