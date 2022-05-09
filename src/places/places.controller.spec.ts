import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from '@places/places.controller';
import { PlacesService } from '@places/places.service';

describe('PlacesController', () => {
  let controller: PlacesController;
  let mockedPlacesService: Partial<PlacesService>;

  beforeEach(async () => {
    mockedPlacesService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        PlacesService,
        { provide: PlacesService, useValue: mockedPlacesService },
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
