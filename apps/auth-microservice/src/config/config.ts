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
	NODEMAILER_PASS: process.env.NODEMAILER_PASS,

	// jwt
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
	JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,

	// google oauth
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

	// github oauth
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
}
