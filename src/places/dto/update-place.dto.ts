import { PartialType } from '@nestjs/swagger';
import { CreatePlaceDto } from '@places/dto/create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {}
