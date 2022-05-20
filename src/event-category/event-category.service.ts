import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { EventCategoryDTO } from "./event-category.dto";
import { EventCategory } from './event-category.model';

@Injectable()
export class EventCategoryService {
    constructor(@InjectModel("EventCategorySchema") private readonly eventCategoryModel: Model<EventCategory>){ }

    async addEventCategory(eventCategoryDTO: EventCategoryDTO): Promise<EventCategoryDTO> {
        if(await this.doesEventCategoryExist(eventCategoryDTO.categoryName)){
            throw new ForbiddenException("This event category already exists");
        }

        const eventCategory = new this.eventCategoryModel({ categoryName: eventCategoryDTO.categoryName });
        return await eventCategory.save() as EventCategoryDTO;
    }

    async getEventCategories(): Promise<EventCategoryDTO[]> {
        try{
            return await this.eventCategoryModel.find({ }).exec() as EventCategoryDTO[];
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch Event categories");
        }
    }

    async getEventCategory(eventCategoryId: string): Promise<EventCategory> {
        try{
            return await this.eventCategoryModel.findById(eventCategoryId).exec() as EventCategory;
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch Event category");
        }
    }

    //@Delete
    async deleteEventCategory(eventCategoryId: string): Promise<any>{
        try {
            await this.eventCategoryModel.deleteOne({ _id: eventCategoryId }).exec();
            return { message: "Event category Deleted" };
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Delete failed");
        }
    }

    private async doesEventCategoryExist(eventCategoryName: string): Promise<boolean> {
        return await this.eventCategoryModel.exists({ categoryName: eventCategoryName });
    }
}
