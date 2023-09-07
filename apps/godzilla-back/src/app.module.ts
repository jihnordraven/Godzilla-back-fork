import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"
import {
	GoogleStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	LocalStrategy
} from "./auth/guards-handlers/strategies"
import { ConfigModule } from "@nestjs/config"

const strategies = [LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy, GoogleStrategy]

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService, ...strategies]
})
export class AppModule {}
