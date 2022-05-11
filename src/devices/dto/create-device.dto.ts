import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Name of the Device',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
