import { ForbiddenException, Injectable } from "@nestjs/common"
import { AllTablesEnum } from "libs/models"
import { PrismaService } from "./prisma/prisma.service"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AppService {
	constructor(
		private readonly config: ConfigService,
		protected readonly prisma: PrismaService
	) {}
	async getHello(): Promise<string> {
		return `Start server on ${this.config.get<number>("PORT")} port`
	}

	async deleteAll() {
		if (this.config.get<string>("DEPLOY") === "TEST") {
			for (const table of Object.values(AllTablesEnum)) {
				if (this.prisma[table]) {
					await this.prisma[table].deleteMany()
				}
			}
		} else {
			throw new ForbiddenException("This endpoint is closed for prodaction")
		}
	}
}
