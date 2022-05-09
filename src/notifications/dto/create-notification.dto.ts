import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Content of the notification',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  content: string;
}
