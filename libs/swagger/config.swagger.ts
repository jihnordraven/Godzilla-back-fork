import { DocumentBuilder } from "@nestjs/swagger"

export const swaggerConfig = {
	development: new DocumentBuilder()
		.setTitle("Godzilla-back")
		.setDescription("The godzilla-back API description")
		.setVersion("1.0")
		.build()
}
