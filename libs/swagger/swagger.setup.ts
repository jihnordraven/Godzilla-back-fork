import { INestApplication } from "@nestjs/common"
import { swaggerConfig } from "./config.swagger"
import { SwaggerModule } from "@nestjs/swagger"

export const swaggerSetup = (app: INestApplication) => {
	const options = swaggerConfig.development
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup("api/v1/testing", app, document, {
		customCssUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
		customJs: [
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
		]
	})
}
