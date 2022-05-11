import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { RoomsService } from '@rooms/rooms.service';
import { CreateRoomDto, UpdateRoomDto } from '@rooms/dto';
import { NotFoundInterceptor } from '@commons/interceptors';

@Controller('rooms')
@UseInterceptors(NotFoundInterceptor)
@ApiTags('My Home')
@ApiInternalServerErrorResponse({
  description: 'An unpredictable (non HTTP) error has occured.',
})
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Room' })
  @ApiCreatedResponse({
    description: 'The room has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: "The room can't be created, because of invalid data format.",
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all Rooms' })
  @ApiOkResponse({
    description: 'The rooms have been successfully found.',
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a Room from an Id' })
  @ApiOkResponse({
    description: 'The room has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: "The room has not been found or doesn't exist.",
  })
  @ApiBadRequestResponse({
    description:
      "The room can't be found, because of invalid parameter format.",
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Room from an Id' })
  @ApiOkResponse({
    description: 'The room has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description:
      "The room has not been found or doesn't exist, so it can't be updated.",
  })
  @ApiBadRequestResponse({
    description:
      "The room can't be updated, because of invalid data or parameter format.",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Room from an Id' })
  @ApiOkResponse({
    description: 'The room has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description:
      "The room can't be deleted, because of invalid parameter format.",
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.remove(+id);
  }
}
