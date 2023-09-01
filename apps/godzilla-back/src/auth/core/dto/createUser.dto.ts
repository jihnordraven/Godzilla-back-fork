import { TrimDecorator } from '../../../../../../library/helpers';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  CheckedUniqueEmail,
  CheckedUniqueUsername,
} from '../../class-validators';
import { CreateUserType } from '../models';

export class CreateUserDto implements CreateUserType {
  @Validate(CheckedUniqueUsername)
  @TrimDecorator()
  @IsString()
  @Matches(/^[1-9A-Za-z.\-_]+$/)
  @Length(6, 30)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User username',
    type: String,
    minLength: 6,
    maxLength: 30,
    pattern: '^[1-9A-Za-z.\\-_]+$',
    nullable: false,
  })
  readonly username: string;

  @Validate(CheckedUniqueEmail)
  @TrimDecorator()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    type: String,
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    nullable: false,
  })
  readonly email: string;

  @TrimDecorator()
  @Matches(/^[1-9a-zA-Z!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{\|}~]+$/)
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    type: String,
    minLength: 6,
    maxLength: 20,
    pattern: '^[1-9a-zA-Z!"#$%&\'()*+,\\-.\\/:;<=>?@\\[\\]^_`{\\|}~]+$',
    nullable: false,
  })
  readonly password: string;
}
