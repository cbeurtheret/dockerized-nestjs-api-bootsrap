import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from '@devices/devices.controller';
import { DevicesService } from '@devices/devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;
  let mockedDevicesService: Partial<DevicesService>;

  beforeEach(async () => {
    mockedDevicesService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [{ provide: DevicesService, useValue: mockedDevicesService }],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
