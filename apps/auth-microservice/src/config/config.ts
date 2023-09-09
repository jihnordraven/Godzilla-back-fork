import process from "process"
import { ConfigModule } from "@nestjs/config"
export const CONFIG = {
	// node
	START_MODULE: ConfigModule.forRoot({ isGlobal: true }),
	HOST: process.env.HOST,
	FRONTEND_HOST: process.env.FRONTEND_HOST,

	// nodemailer
	NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
	NODEMAILER_USER: process.env.NODEMAILER_USER,
	NODEMAILER_PASS: process.env.NODEMAILER_PASS
}
