import { IsNotEmpty, IsString, Matches, Validate } from 'class-validator';
import { TrimDecorator } from '../../../../../../library/helpers';
import { CheckedEmailToBase } from '../../class-validators';
import { PassRecoveryType } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class PassRecoveryDto implements PassRecoveryType {
  @Validate(CheckedEmailToBase)
  @TrimDecorator()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @ApiProperty({
    description: 'Email of registered user useremail@company.com',
    type: String,
    pattern: '^[A-Za-z]+@[A-Za-z]+\\.[A-Za-z]+$',
    nullable: false,
  })
  @IsNotEmpty()
  readonly email: string;
}
