import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlacesService } from '@places/places.service';
import { Place } from '@places/entities';

describe('PlacesService', () => {
  let service: PlacesService;
  let mockedPlacesRepository: Partial<Repository<Place>>;

  beforeEach(async () => {
    mockedPlacesRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: mockedPlacesRepository,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
