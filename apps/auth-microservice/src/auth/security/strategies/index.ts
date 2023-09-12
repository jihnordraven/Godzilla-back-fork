import { GithubStrategy } from "./github.strategy"
import { GoogleStrategy } from "./google.strategy"
import { JwtAccessStrategy } from "./jwtAccess.strategy"
import { JwtRefreshStrategy } from "./jwtRefresh.strategy"
import { LocalStrategy } from "./local.strategy"

export * from "./local.strategy"
export * from "./jwtAccess.strategy"
export * from "./jwtRefresh.strategy"
export * from "./google.strategy"
export * from "./github.strategy"

export const STRATEGIES = [
	LocalStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	GoogleStrategy,
	GithubStrategy
]
