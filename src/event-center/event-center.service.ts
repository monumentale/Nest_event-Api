import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { EventCenter } from './event-center.model';
import { EventCenterDTO } from './event-center.dto';

@Injectable()
export class EventCenterService {
    constructor(@InjectModel("EventCenterSchema") private readonly eventCenterModel: Model<EventCenter>){ }

    async addEventCenter(eventCenterDTO: EventCenterDTO): Promise<EventCenterDTO> {
        if(!await this.doesEventCenterExist(eventCenterDTO.eventCenterName)){
            //throw new ForbiddenException("This event center already exists");
            const eventCenter = new this.eventCenterModel({ 
                eventCenterName: eventCenterDTO.eventCenterName 
            });
            return await eventCenter.save() as EventCenterDTO;
        }
    }

    async getEventCenters(): Promise<EventCenterDTO[]> {
        try{
            return await this.eventCenterModel.find({ }).exec() as EventCenterDTO[];
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch Event centers");
        }
    }

    async getEventCenter(eventCenterId: string): Promise<EventCenterDTO> {
        try{
            return await this.eventCenterModel.findById(eventCenterId).exec() as EventCenterDTO;
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch Event center");
        }
    }

    //@Delete
    async deleteEventCenter(eventCenterId: string): Promise<any> {
        try {
            await this.eventCenterModel.deleteOne({ _id: eventCenterId }).exec();
            return { message: "Event center Deleted" };
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Delete failed");
        }
    }

    private async doesEventCenterExist(eventCenterName: string): Promise<boolean> {
        return await this.eventCenterModel.exists({ eventCenterName });
    }
}