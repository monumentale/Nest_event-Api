import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventCategoryService } from './event-category.service';
import { EventCategoryController } from './event-category.controller';
import { EventCategorySchema } from './event-category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
      name: "EventCategorySchema",
      schema: EventCategorySchema
    }
    ])
  ],
  providers: [EventCategoryService],
  controllers: [EventCategoryController],
  exports: [EventCategoryService]
})
export class EventCategoryModule {}
