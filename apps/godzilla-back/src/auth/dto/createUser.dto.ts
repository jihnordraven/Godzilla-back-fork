import { TrimDecorator } from '../../../../../library/helpers';
import { IsNotEmpty, Length, Matches, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CheckedUniqueUsername } from '../class-validators/checkedUniqueUsername.class-validators';
import { CheckedUniqueEmail } from '../class-validators/checkedUniqueEmail.class-validators';

type CreateUserType = {
  username: string;
  email: string;
  password: string;
};

export class CreateUserDto implements CreateUserType {
  @Validate(CheckedUniqueUsername)
  @TrimDecorator()
  @Matches(/^[A-Za-z0-9.\-!@#$%^&*()_+=<>?]+$/)
  @Length(6, 30)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User username',
    type: String,
    minLength: 6,
    maxLength: 30,
    pattern: '^[A-Za-z0-9.\\-!@#$%^&*()_+=<>?]+$',
    nullable: false,
  })
  readonly username: string;

  @Validate(CheckedUniqueEmail)
  @TrimDecorator()
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
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])[0-9A-Za-z!\"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/,
  )
  @Length(6, 20)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    type: String,
    minLength: 6,
    maxLength: 20,
    pattern:
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\\"#$%&\'()*+,\\-./:;<=>?@[\\]^_`{|}~])[0-9A-Za-z!\\"#$%&\'()*+,\\-./:;<=>?@[\\]^_`{|}~]+$',
    nullable: false,
  })
  readonly password: string;
}
