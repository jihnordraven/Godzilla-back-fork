import { CONFIG } from './config/config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { LocalStrategy } from './auth/guards-handlers/strategies'

const strategies = [LocalStrategy]

@Module({
	imports: [CONFIG.START_MODULE, AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService, ...strategies]
})
export class AppModule {}
