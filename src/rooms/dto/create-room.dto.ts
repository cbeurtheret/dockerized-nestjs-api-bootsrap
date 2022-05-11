import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Name of the Room',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
