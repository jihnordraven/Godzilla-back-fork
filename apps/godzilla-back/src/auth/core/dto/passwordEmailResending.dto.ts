import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TrimDecorator } from '../../../../../../library/helpers';
import { PasswordEmailResendingType } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordEmailResendingDto implements PasswordEmailResendingType {
  @TrimDecorator()
  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'The ID of the user who requested the new password',
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  readonly userId: string;
}
