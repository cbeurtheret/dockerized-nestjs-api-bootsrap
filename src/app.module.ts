import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from '@health/health.module';
import { PromModule } from '@digikare/nestjs-prom';
import { TracingModule } from '@dollarsign/nestjs-jaeger-tracing';
import { NotificationsModule } from '@notifications/notifications.module';
import { PlacesModule } from '@places/places.module';
import { RoomsModule } from '@rooms/rooms.module';
import { DevicesModule } from '@devices/devices.module';
import { AppController } from '@core/app.controller';
import * as Pkg from '@root/package.json';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('TYPEORM_CONNECTION') as any,
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'production' ? false:true,
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    PromModule.forRoot({
      defaultLabels: {
        app: `${Pkg.name}`,
        version: `${Pkg.version}`,
      },
      withHttpMiddleware: {
        enable: true,
      },
    }),
    TracingModule.forRoot({
      exporterConfig: {
        serviceName: `${Pkg.name}`,
        tags: [{ key: 'version', value: `${Pkg.version}` }],
      },
      isSimpleSpanProcessor: true,
    }),
    NotificationsModule,
    PlacesModule,
    RoomsModule,
    DevicesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
