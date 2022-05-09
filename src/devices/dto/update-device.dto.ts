import { PartialType } from '@nestjs/swagger';
import { CreateDeviceDto } from '@devices/dto/create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
