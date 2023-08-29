import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor() {}

  async checkedEmailToBase() {
    return false;
  }
}
