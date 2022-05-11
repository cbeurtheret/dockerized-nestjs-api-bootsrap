import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevicesService } from '@devices/devices.service';
import { Device } from '@devices/entities';

describe('DevicesService', () => {
  let service: DevicesService;
  let mockedDevicesRepository: Partial<Repository<Device>>;

  beforeEach(async () => {
    mockedDevicesRepository = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useValue: mockedDevicesRepository,
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
