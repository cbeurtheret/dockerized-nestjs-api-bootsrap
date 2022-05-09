import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '@notifications/dto';
import { Notification } from '@notifications/entities';
import { NotificationEvent } from '@notifications/events';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {
  private readonly notificationEvents = new BehaviorSubject<NotificationEvent>({
    data: 'clear',
  });

  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {
    this.findAll()
      .then((notifications) =>
        notifications.forEach((notification) =>
          this.pushToStream(notification),
        ),
      )
      .catch((err) => console.error('Error => ', err));
  }

  create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = this.notificationsRepository.create(
      createNotificationDto,
    );
    return this.notificationsRepository.save(newNotification);
  }

  findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find();
  }

  findOne(id: number): Promise<Notification> {
    return this.notificationsRepository.findOneBy({ id });
  }

  notificationsStream(): Observable<NotificationEvent> {
    return this.notificationEvents.pipe(
      map((ev) => {
        console.log('Creating NotificationEvent from Notification => ', ev);
        return ev;
      }),
    );
  }

  pushToStream(data: Notification): void {
    this.notificationEvents.next({ data } as NotificationEvent);
  }

  clearStream(): void {
    this.notificationEvents.next({ data: 'clear' });
  }
}
