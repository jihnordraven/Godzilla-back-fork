import { SendMailOptions, Transporter, createTransport } from 'nodemailer'

type SendMailType = {
	readonly email: string
	readonly code: string
}

export class MailerAdapter {
	private async options(options: SendMailOptions): Promise<void> {
		const transport: Transporter = createTransport({
			service: 'gmail',
			auth: {
				user: 'jihnordraven@gmail.com',
				pass: 'htsubscpzoymrwce'
			}
		})
		await transport.sendMail(options)
	}

	public async sendMail({ email, code }: SendMailType): Promise<void> {
		return this.options({
			to: email,
			from: 'jihnordraven@gmail.com',
			subject: 'Email confirmaiton',
			html: `<a href='http://localhost:5000/api/v1/auth/registration-confirmaiton?code=${code}'>Confirm email</a>`
		})
	}
}
