import { IsNotEmpty, IsUUID, Length, Matches, Validate } from 'class-validator';
import { TrimDecorator } from '../../../../../library/helpers';
import { CheckedConfirmCode } from '../class-validators';
import { ApiProperty } from '@nestjs/swagger';

type NewPassUpdateType = {
  newPassword: string;
  recoveryCode: string;
};

export class NewPassUpdateDto implements NewPassUpdateType {
  @TrimDecorator()
  @Length(6, 20)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])[0-9A-Za-z!\"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/,
  )
  @IsNotEmpty()
  @ApiProperty({
    description: 'New user password',
    type: String,
    minLength: 6,
    maxLength: 20,
    pattern:
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\\"#$%&\'()*+,\\-./:;<=>?@[\\]^_`{|}~])[0-9A-Za-z!\\"#$%&\'()*+,\\-./:;<=>?@[\\]^_`{|}~]+$',
    nullable: false,
  })
  readonly newPassword: string;

  @Validate(CheckedConfirmCode)
  @TrimDecorator()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Activation code sent to email',
    type: String,
    nullable: false,
  })
  readonly recoveryCode: string;
}
