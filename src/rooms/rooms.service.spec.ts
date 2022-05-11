import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomsService } from '@rooms/rooms.service';
import { Room } from '@rooms/entities';

describe('RoomsService', () => {
  let service: RoomsService;
  let mockedRoomsRepository: Partial<Repository<Room>>;

  beforeEach(async () => {
    mockedRoomsRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: getRepositoryToken(Room), useValue: mockedRoomsRepository },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
