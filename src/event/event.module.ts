import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.model';
import { EventCenterModule } from '../event-center/event-center.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "EventSchema",
        schema: EventSchema
      }
    ]),
    EventCenterModule
  ],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}