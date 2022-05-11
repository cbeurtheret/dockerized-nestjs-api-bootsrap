import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '@rooms/dto';
import { Room } from '@rooms/entities';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    return this.roomsRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException(
        'Unable to update the room, because it can not be found',
      );
    }
    this.roomsRepository.merge(room, updateRoomDto);
    return this.roomsRepository.save(room);
  }

  async remove(id: number): Promise<Room> {
    const room = await this.findOne(id);
    if (!room) {
      return Promise.resolve(room);
    }
    return this.roomsRepository.remove(room);
  }
}
