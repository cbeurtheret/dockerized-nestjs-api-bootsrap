import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlaceDto, UpdatePlaceDto } from '@places/dto';
import { Place } from '@places/entities';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placesRepository.create(createPlaceDto);
    return this.placesRepository.save(place);
  }

  async findAll(): Promise<Place[]> {
    return this.placesRepository.find();
  }

  async findOne(id: number): Promise<Place> {
    return this.placesRepository.findOneBy({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.findOne(id);
    if (!place)
      throw new NotFoundException(
        'Unable to update the place, because it can not be found',
      );
    this.placesRepository.merge(place, updatePlaceDto);
    return this.placesRepository.save(place);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.placesRepository.delete(id);
  }
}
