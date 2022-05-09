import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@health/health.controller';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let mockedHealthCheckService: Partial<HealthCheckService>;
  let mockedTypeOrmHealthIndicator: Partial<TypeOrmHealthIndicator>;

  beforeEach(async () => {
    mockedHealthCheckService = {};
    mockedTypeOrmHealthIndicator = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: mockedHealthCheckService },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockedTypeOrmHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
