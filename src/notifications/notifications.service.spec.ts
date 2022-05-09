/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from '@notifications/notifications.service';
import { Notification } from '@notifications/entities';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let mockedNotificationsRepository: Partial<Repository<Notification>>;

  beforeEach(async () => {
    mockedNotificationsRepository = {
      find: () => Promise.resolve([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockedNotificationsRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
