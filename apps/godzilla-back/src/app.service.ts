import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Server is start');
    return `Hello World! ${process.env.PORT}`;
  }
}
