import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../repository/auth.repository';
import { SessionsBaseType } from '../../../../../../library/models';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class LogoutCommand {
  constructor(
    public readonly userId: string,
    public readonly sessionId: string,
  ) {}
}

@CommandHandler(LogoutCommand)
export class LogoutUseCase implements ICommandHandler<LogoutCommand> {
  constructor(protected authRepository: AuthRepository) {}
  async execute(command: LogoutCommand) {
    const { userId, sessionId } = command;

    const session: SessionsBaseType | null =
      await this.authRepository.findActiveSession(sessionId);

    if (!session) {
      throw new NotFoundException();
    }

    if (session.userOwnerId !== userId) {
      throw new ForbiddenException();
    }

    await this.authRepository.deleteSession(sessionId);
  }
}
