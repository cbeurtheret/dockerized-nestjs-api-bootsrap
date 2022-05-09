import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ParseIntPipe,
  Res,
  Sse,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { NotificationsService } from '@notifications/notifications.service';
import { CreateNotificationDto } from '@notifications/dto';
import { Notification } from '@notifications/entities';
import { NotificationEvent } from '@notifications/events';
import { NotFoundInterceptor } from '@commons/interceptors';

@Controller('notifications')
@ApiTags('Notifications')
@ApiInternalServerErrorResponse({
  description: 'An unpredictable (non HTTP) error has occured.',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('clear-events')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Clears the realtime stream of Notifications' })
  @ApiNoContentResponse({
    description: 'The realtime stream has been cleared.',
  })
  clear(): void {
    this.notificationsService.clearStream();
  }

  @Get('show-events')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Shows the realtime stream of Notifications' })
  @ApiOkResponse({
    description: 'The page is available.',
  })
  index(@Res() response: Response): void {
    response.type('text/html').send(`
      <script type="text/javascript">
        const eventSource = new EventSource('/notifications/events');
        eventSource.onmessage = ({ data }) => {
          if (data && data === 'clear') {
            document.body.textContent = '';
          } else {
            const notification = document.createElement('li');
            notification.innerText = 'New notification: ' + data;
            document.body.appendChild(notification);
          }
        }
      </script>
    `);
  }

  @Sse('events')
  @ApiOperation({ summary: 'Realtime stream of Notifications' })
  @ApiOkResponse({
    description: 'The stream is available.',
  })
  stream(): Observable<NotificationEvent> {
    return this.notificationsService.notificationsStream();
  }

  @Post()
  @UseInterceptors(NotFoundInterceptor)
  @ApiOperation({ summary: 'Creates a new Notification' })
  @ApiCreatedResponse({
    description: 'The notification has been successfully created.',
  })
  @ApiBadRequestResponse({
    description:
      "The Notification can't be created, because of invalid data format.",
  })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  @ApiOperation({ summary: 'Retrieves all Notifications' })
  @ApiOkResponse({
    description: 'The notifications have been successfully found.',
  })
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  @ApiOperation({ summary: 'Retrieves a Notification from an Id' })
  @ApiOkResponse({
    description: 'The notification has been successfully found.',
  })
  @ApiNotFoundResponse({
    description: "The notification has not been found or doesn't exist.",
  })
  @ApiBadRequestResponse({
    description:
      "The Notification can't be found, because of invalid parameter format.",
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }
}
