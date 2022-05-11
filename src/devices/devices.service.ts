import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto, UpdateDeviceDto } from '@devices/dto';
import { Device } from '@devices/entities';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    return this.devicesRepository.findOneBy({ id });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);
    if (!device) {
      throw new NotFoundException(
        'Unable to update the device, because it can not be found',
      );
    }
    this.devicesRepository.merge(device, updateDeviceDto);
    return this.devicesRepository.save(device);
  }

  async remove(id: number): Promise<Device> {
    const device = await this.findOne(id);
    if (!device) {
      return Promise.resolve(device);
    }
    return this.devicesRepository.remove(device);
  }
}
