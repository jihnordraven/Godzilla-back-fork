import { CONFIG } from "apps/godzilla-back/config/config"
import { SendMailOptions, Transporter, createTransport } from "nodemailer"

type SendMailType = {
	readonly email: string
	readonly code: string
}

export class MailerAdapter {
	private async options(options: SendMailOptions): Promise<void> {
		const transport: Transporter = createTransport({
			service: "gmail",
			auth: {
				user: "jihnordraven@gmail.com",
				pass: "htsubscpzoymrwce"
			}
		})
		await transport.sendMail(options)
	}

	public async sendConfirmCode({ email, code }: SendMailType): Promise<void> {
		return this.options({
			to: email,
			from: "jihnordraven@gmail.com",
			subject: "Email confirmaiton",
			html: `<a href='${CONFIG.HOST}/api/v1/auth/registration-confirmation?code=${code}'>Confirm email</a>`
		})
	}

	public async sendPasswordCode({ email, code }: { email: string; code: string }): Promise<void> {
		return this.options({
			to: email,
			from: "jihnordraven@gmail.com",
			subject: "Password recovery",
			html: `<a href='${CONFIG.HOST}/api/v1/auth/password-recovery-confirmation?code=${code}'>Password recovery</a>`
		})
	}
}
