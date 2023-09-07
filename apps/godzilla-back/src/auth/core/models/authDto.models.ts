export type CreateUserType = {
	username: string
	email: string
	password: string
}

export type NewPassUpdateType = {
	newPassword: string
	recoveryCode: string
}

export type PassRecoveryType = {
	email: string
}

export type EmailResendingType = {
	userId: string
}

export type PasswordEmailResendingType = {
	userId: string
}

export type LocalRegisterType = {
	readonly email: string
	readonly username: string
	readonly hashPassword?: string
}

export type CreateEmailCodeType = {
	readonly userId: string
}
