import { Injectable } from '@nestjs/common'
import { AuthRepository } from '../repository/auth.repository'
import { UserBaseType } from '../../../../../library/models'
import { BcryptAdapter } from '../../adapters/bcrypt.adapter'
import { JwtAccessPayload } from '../../../../../library/helpers'

@Injectable()
export class AuthService {
	constructor(
		protected authRepository: AuthRepository,
		protected bcrypt: BcryptAdapter
	) {}

	async validateLogin(
		email: string,
		password: string
	): Promise<JwtAccessPayload | null> {
		const user: UserBaseType | null = await this.authRepository.findUserToEmail(email)

		if (!user || user.isBanned === true) {
			return null
		}

		const validatePassword: boolean = await this.bcrypt.hushCompare(
			password,
			user.hushPass
		)

		if (!validatePassword) {
			return null
		}

		return { userId: user.id }
	}

	async checkedEmailToBase(email: string): Promise<boolean> {
		console.log(email)
		return false
	}

	async checkedConfirmCode(code: string): Promise<boolean> {
		console.log(code)
		return false
	}

	async checkedUniqueUsername(userName: string): Promise<boolean> {
		console.log(userName)
		return false
	}

	async checkedUniqueEmail(email: string): Promise<boolean> {
		console.log(email)
		return false
	}
}
