import { compare, hash } from "bcrypt"

type HashInputType = { password: string }

type CompareInputType = { password: string; hash: string }

export class BcryptAdapter {
	public async hash(data: HashInputType): Promise<string> {
		return hash(data.password, 8)
	}

	public async compare(data: CompareInputType): Promise<boolean> {
		return compare(data.password, data.hash)
	}
}
