import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from '@rooms/dto/create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
