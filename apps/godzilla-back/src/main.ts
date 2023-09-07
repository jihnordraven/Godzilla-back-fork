import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { useContainer } from "class-validator"
import {
	INestApplication,
	InternalServerErrorException,
	Logger,
	ValidationPipe
} from "@nestjs/common"
import cookieParser from "cookie-parser"
import { ConfigService } from "@nestjs/config"
import { blue, red } from "colorette"
import { validatePipeOptions } from "../../../libs/errors-handlers"
import { swaggerSetup } from "../../../libs/swagger/swagger.setup"

// async function appLoader() {
// 	const logger: Logger = new Logger("bootstrap")

// 	const app = await NestFactory.create<INestApplication>(AppModule)

// 	app.enableCors({
// 		origin: [
// 			"http://localhost:3000",
// 			"https://godzilla-front.vercel.app/",
// 			"https://godzillagram.com/"
// 		],
// 		credentials: true,
// 		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
// 	})

// 	app.use(cookieParser())

// 	useContainer(app.select(AppModule), { fallbackOnErrors: true })
// 	app.useGlobalPipes(new ValidationPipe(validatePipeOptions))
// 	// app.useGlobalFilters(new HttpExceptionFilter())

// 	app.setGlobalPrefix("api/v1")

// 	const config = app.get(ConfigService) as ConfigService
// 	const DEPLOY: string = config.get<string>("DEPLOY")
// 	const PORT: number = config.get<number>("PORT")

// 	if (DEPLOY === "TEST") swaggerSetup(app)

// 	await app.listen(PORT)
// 	logger.log(blue(`Server is running on ${PORT} with status: ${DEPLOY}`))
// }

// async function bootstrap(): Promise<void> {
// 	const logger: Logger = new Logger("bootstrap")
// 	try {
// 		await appLoader()
// 	} catch (err: unknown) {
// 		logger.error(red(`Unable to launch server. Learn more at: ${err}`))
// 		throw new InternalServerErrorException()
// 	}
// }

// bootstrap()

const bootstrap = async (): Promise<void> => {
	const logger: Logger = new Logger("bootstrap")

	try {
		const app = await NestFactory.create<INestApplication>(AppModule)

		app.enableCors({
			origin: [
				"http://localhost:3000",
				"https://godzilla-front.vercel.app/",
				"https://godzillagram.com/"
			],
			credentials: true,
			methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
		})

		app.use(cookieParser())

		useContainer(app.select(AppModule), { fallbackOnErrors: true })
		app.useGlobalPipes(new ValidationPipe(validatePipeOptions))
		// app.useGlobalFilters(new HttpExceptionFilter())

		app.setGlobalPrefix("api/v1")

		const config = app.get(ConfigService) as ConfigService
		const DEPLOY: string = config.get<string>("DEPLOY")
		const PORT: number = config.get<number>("PORT")

		if (DEPLOY === "TEST") swaggerSetup(app)

		await app.listen(PORT)
		logger.log(blue(`Server is running on ${PORT} with status: ${DEPLOY}`))
	} catch (err: unknown) {
		logger.error(red(`Unable to launch server. Learn more at: ${err}`))
		throw new InternalServerErrorException()
	}
}

bootstrap()
