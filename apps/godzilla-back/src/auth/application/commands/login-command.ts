import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../repository/auth.repository';
import { add } from 'date-fns';
import { CONFIG } from '../../../config/config';
import { JwtService } from '@nestjs/jwt';
import { AuthObjectType, TokensObjectType } from '../../core/models';
import { SessionsBaseType } from '../../../../../../library/models';

export class LoginCommand {
  constructor(public readonly authObject: AuthObjectType) {}
}

@CommandHandler(LoginCommand)
export class LoginUseCase implements ICommandHandler<LoginCommand> {
  constructor(
    protected authRepository: AuthRepository,
    protected jwtService: JwtService,
  ) {}
  async execute(command: LoginCommand): Promise<TokensObjectType> {
    const { authObject } = command;

    const expiresTime: string = add(new Date(), {
      seconds: +CONFIG.EXPIRES_REFRESH,
    }).toString();

    const newSession: SessionsBaseType =
      await this.authRepository.addNewSession(authObject, expiresTime);

    const refreshToken: string = this.jwtService.sign(
      { sessionId: newSession.id, userId: newSession.userOwnerId },
      { secret: CONFIG.JWT_REFRESH_SECRET, expiresIn: +CONFIG.EXPIRES_REFRESH },
    );

    const accessToken: string = this.jwtService.sign(
      { userId: newSession.userOwnerId },
      { secret: CONFIG.JWT_ACCESS_SECRET, expiresIn: +CONFIG.EXPIRES_ACCESS },
    );

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  }
}
