import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from '@notifications/notifications.controller';
import { NotificationsService } from '@notifications/notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let mockedNotificationsService: Partial<NotificationsService>;

  beforeEach(async () => {
    mockedNotificationsService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        NotificationsService,
        {
          provide: NotificationsService,
          useValue: mockedNotificationsService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
