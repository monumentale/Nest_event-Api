import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventCenterService } from './event-center.service';
import { EventCenterController } from './event-center.controller';
import { EventCenterSchema } from './event-center.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "EventCenterSchema",
        schema: EventCenterSchema
      }
    ])
  ],
  providers: [EventCenterService],
  controllers: [EventCenterController],
  exports: [EventCenterService]
})
export class EventCenterModule {}
