import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TrimDecorator } from '../../../../../../library/helpers';
import { EmailResendingType } from '../models';
import { ApiProperty } from '@nestjs/swagger';

export class EmailResendingDto implements EmailResendingType {
  @TrimDecorator()
  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Identifier of an inactive user',
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  readonly userId: string;
}
