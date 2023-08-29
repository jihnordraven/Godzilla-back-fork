import { IsNotEmpty, Matches, Validate } from 'class-validator';
import { TrimDecorator } from '../../../../../library/helpers';
import { CheckedEmailToBase } from '../class-validators';
import { ApiProperty } from '@nestjs/swagger';

type PassRecoveryType = {
  email: string;
};

export class PassRecoveryDto implements PassRecoveryType {
  @Validate(CheckedEmailToBase)
  @TrimDecorator()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of registered user useremail@company.com',
    type: String,
    pattern: '^[A-Za-z]+@[A-Za-z]+\\.[A-Za-z]+$',
    nullable: false,
  })
  readonly email: string;
}
