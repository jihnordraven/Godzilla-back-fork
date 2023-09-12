export interface GoogleRegisterDto {
	readonly sub: string
	readonly name?: string | null
	readonly given_name?: string | null
	readonly family_name?: string | null
	readonly picture?: string | null
	readonly email: string
	readonly email_verified: boolean
	readonly locale?: string | null
}
