import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { NotificationsService } from '@notifications/notifications.service';
import { Notification } from '@notifications/entities';

@EventSubscriber()
export class NotificationSubscriber
  implements EntitySubscriberInterface<Notification>
{
  constructor(
    connection: Connection,
    private notificationsService: NotificationsService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Notification;
  }

  afterInsert(event: InsertEvent<Notification>) {
    this.notificationsService.pushToStream(event.entity);
  }
}
