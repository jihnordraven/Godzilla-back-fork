import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Testing')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	@ApiExcludeEndpoint()
	async getHello() {
		return await this.appService.getHello()
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete all data in all' })
	@Delete('testing/all-data')
	async testingAllDelete() {
		try {
			await this.appService.deleteAll()
		} catch (e) {
			console.log(e)
		}
	}
}
