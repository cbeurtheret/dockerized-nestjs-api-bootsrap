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
import { DevicesService } from '@devices/devices.service';
import { CreateDeviceDto, UpdateDeviceDto } from '@devices/dto';
import { NotFoundInterceptor } from '@commons/interceptors';

@Controller('devices')
@UseInterceptors(NotFoundInterceptor)
@ApiTags('My Home')
@ApiInternalServerErrorResponse({
  description: 'An unpredictable (non HTTP) error has occured.',
})
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new Device' })
  @ApiCreatedResponse({
    description: 'The device has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: "The device can't be created, because of invalid data format.",
  })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all Devices' })
  @ApiOkResponse({
    description: 'The devices have been successfully found.',
  })
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves a Device from an Id' })
  @ApiOkResponse({
    description: 'The device has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: "The device has not been found or doesn't exist.",
  })
  @ApiBadRequestResponse({
    description:
      "The device can't be found, because of invalid parameter format.",
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Device from an Id' })
  @ApiOkResponse({
    description: 'The device has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description:
      "The device has not been found or doesn't exist, so it can't be updated.",
  })
  @ApiBadRequestResponse({
    description:
      "The device can't be updated, because of invalid data or parameter format.",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Device from an Id' })
  @ApiOkResponse({
    description: 'The device has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description:
      "The device can't be deleted, because of invalid parameter format.",
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.remove(+id);
  }
}
