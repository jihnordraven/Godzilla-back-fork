import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { TrimDecorator } from '../../../../../../library/helpers';
import { CheckedConfirmCode } from '../../class-validators';
import { ApiProperty } from '@nestjs/swagger';
import { NewPassUpdateType } from '../models';

export class NewPassUpdateDto implements NewPassUpdateType {
  @TrimDecorator()
  @Length(6, 20)
  @Matches(/^[1-9a-zA-Z!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{\|}~]+$/)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'New user password',
    type: String,
    minLength: 6,
    maxLength: 20,
    pattern: '^[1-9a-zA-Z!"#$%&\'()*+,\\-.\\/:;<=>?@\\[\\]^_`{\\|}~]+$',
    nullable: false,
  })
  readonly newPassword: string;

  //@Validate(CheckedConfirmCode)
  @TrimDecorator()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Activation code sent to email',
    type: String,
    nullable: false,
  })
  readonly recoveryCode: string;
}
