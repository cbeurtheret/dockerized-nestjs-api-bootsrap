import { Module } from '@nestjs/common';
import { RoomsService } from '@rooms/rooms.service';
import { RoomsController } from '@rooms/rooms.controller';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
