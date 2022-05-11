import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from '@rooms/rooms.controller';
import { RoomsService } from '@rooms/rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;
  let mockedRoomsService: Partial<RoomsService>;

  beforeEach(async () => {
    mockedRoomsService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [{ provide: RoomsService, useValue: mockedRoomsService }],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
