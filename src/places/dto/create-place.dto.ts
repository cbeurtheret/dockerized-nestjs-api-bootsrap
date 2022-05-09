import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty({
    description: 'Name of the Place',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description:
      'Address of the Place in GeocodeJSON. See : https://github.com/geocoders/geocodejson-spec/tree/master/draft',
    type: 'GeocodeJSON object',
  })
  @IsNotEmpty()
  address: object;
}
