import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from '@notifications/notifications.service';
import { NotificationsController } from '@notifications/notifications.controller';
import { Notification } from '@notifications/entities';
import { NotificationSubscriber } from '@notifications/notification.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationSubscriber],
})
export class NotificationsModule {}
