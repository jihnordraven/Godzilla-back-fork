import { ConfirmEmailHandler } from "./confirm-email.command"
import { ConfirmPasswordRecoveryHandler } from "./confirm-password-recovery.command"
import { GoogleRegisterHandler } from "./google-register.command"
import { LocalRegisterHandler } from "./local-register.command"
import { LoginHandler } from "./login.command"
import { LogoutHandler } from "./logout.command"
import { NewPasswordHandler } from "./new-password.command"
import { PasswordRecoveryResendHandler } from "./password-recovery-resend.command"
import { PasswordRecoveryHandler } from "./password-recovery.command"
import { ResendEmailCodeHandler } from "./resend-email-code.command"

export * from "./login.command"
export * from "./local-register.command"
export * from "./resend-email-code.command"
export * from "./password-recovery.command"
export * from "./new-password.command"
export * from "./password-recovery-resend.command"
export * from "./logout.command"
export * from "./google-register.command"
export * from "./confirm-email.command"
export * from "./confirm-password-recovery.command"

export const AUTH_COMMAND_HANDLERS = [
	LocalRegisterHandler,
	LoginHandler,
	ConfirmEmailHandler,
	ResendEmailCodeHandler,
	PasswordRecoveryHandler,
	NewPasswordHandler,
	PasswordRecoveryResendHandler,
	LogoutHandler,
	GoogleRegisterHandler,
	ConfirmPasswordRecoveryHandler
]
