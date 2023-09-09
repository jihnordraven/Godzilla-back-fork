import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"
import {
	GithubStrategy,
	GoogleStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	LocalStrategy
} from "./auth/protection/strategies"
import { CONFIG } from "./config/config"

const strategies = [
	LocalStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	GoogleStrategy,
	GithubStrategy
]

@Module({
	imports: [CONFIG.START_MODULE, AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService, ...strategies]
})
export class AppModule {}
