import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"
import { CONFIG } from "./config/config"
import { STRATEGIES } from "./auth/security/strategies"

@Module({
	imports: [CONFIG.START_MODULE, AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService, ...STRATEGIES]
})
export class AppModule {}
