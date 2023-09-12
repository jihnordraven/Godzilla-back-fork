export interface GithubRegisterDto {
	readonly login: string
	readonly node_id?: string
	readonly avatar_url?: string | null
	readonly name?: string | null
	readonly location?: string | null
	readonly email?: string | null
}
