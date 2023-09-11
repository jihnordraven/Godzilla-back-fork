export type CreateUserType = {
	username: string
	email: string
	password: string
}

export type NewPassUpdateType = {
	password: string
	code: string
}

export type PassRecoveryType = {
	email: string
}

export type EmailResendingType = {
	email: string
}

export type PasswordEmailResendingType = {
	email: string
}

export type LocalRegisterType = {
	readonly email: string
	readonly username: string
	readonly hashPassword?: string
}

export type CreateEmailCodeType = {
	readonly userID: string
}
