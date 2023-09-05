import { v4 } from 'uuid'
import { add } from 'date-fns'

export type ActivateCodeType = {
	readonly codeActivated: string
	readonly lifeTimeCode: string
}

export class ActivateCodeAdapter {
	public async createCode(): Promise<ActivateCodeType> {
		return {
			codeActivated: v4(),
			lifeTimeCode: await this.createTime()
		}
	}

	private async createTime(): Promise<string> {
		return add(new Date(), {
			minutes: 15
		}).toString()
	}
}
