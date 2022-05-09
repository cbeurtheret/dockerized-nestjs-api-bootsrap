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
import { PlacesService } from '@places/places.service';
import { CreatePlaceDto, UpdatePlaceDto } from '@places/dto';
import { NotFoundInterceptor } from '@commons//interceptors';

@Controller('places')
@UseInterceptors(NotFoundInterceptor)
@ApiTags('My Home')
@ApiInternalServerErrorResponse({
  description: 'An unpredictable (non HTTP) error has occured.',
})
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Place' })
  @ApiCreatedResponse({
    description: 'The place has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: "The place can't be created, because of invalid data format.",
  })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all Places' })
  @ApiOkResponse({
    description: 'The places have been successfully found.',
  })
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a Place from an Id' })
  @ApiOkResponse({
    description: 'The place has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: "The place has not been found or doesn't exist.",
  })
  @ApiBadRequestResponse({
    description:
      "The place can't be found, because of invalid parameter format.",
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Place from an Id' })
  @ApiOkResponse({
    description: 'The place has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description:
      "The place has not been found or doesn't exist, so it can't be updated.",
  })
  @ApiBadRequestResponse({
    description:
      "The place can't be updated, because of invalid data or parameter format.",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Place from an Id' })
  @ApiOkResponse({
    description: 'The place has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description:
      "The place can't be deleted, because of invalid parameter format.",
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.remove(id);
  }
}
