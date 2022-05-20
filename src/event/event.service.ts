import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Event } from "./event.model";
import { EventCenterService } from '../event-center/event-center.service';
import { EventDTO } from './event.dto';
import { EventCenterDTO } from '../event-center/event-center.dto';

@Injectable()
export class EventService {
    constructor(@InjectModel("EventSchema") private readonly eventModel: Model<Event>, 
    private readonly eventCenterService: EventCenterService){ }

    async addEvent(
        eventName: string,
        eventDescription: string,
        category: string,
        state: string,
        lga: string,
        eventDate: Date,
        startTime: string,
        postedBy: string,
        eventGuests?: string[],
        activities?: string[],
        eventCenter?: string,
        eventCenterText?: string,
        eventImage?: string
    ): Promise<EventDTO> {
        if(eventCenterText){
            //Add random eventCenter to the list of existing eventCenters
            let eventCenterObj: EventCenterDTO = new EventCenterDTO();
            eventCenterObj.eventCenterName = eventCenter;

            await this.eventCenterService.addEventCenter(eventCenterObj);
        }
        //Extract the Year for the event from eventDate for future use
        const extractYearFromDateString: string = eventDate.toString().split("-")[0];
        const eventYear: number = parseInt(extractYearFromDateString);

        const event = new this.eventModel({
            eventName,
            eventDescription,
            postedBy,
            eventDate,
            startTime,
            category,
            state,
            lga,
            eventYear,
            eventGuests,
            activities,
            eventCenter,
            eventCenterText,
            eventImage
        });

        return await event.save() as EventDTO;
    }

    async getEvent(eventId: string): Promise<Event> {
        return await this.eventModel.findById(eventId).exec() as Event;
    }

    async getEvents(): Promise<Event[]> {
        return await this.eventModel.find({ }).exec() as Event[];
    }

    async getEventsByUser(postedBy: string): Promise<Event[]> {
        return await this.eventModel.find({ postedBy }).exec() as Event[];
    }

    async getEventByTypeLocationAndDate(
        eventType: string, 
        eventDate: Date, 
        eventLocation: string//must be a valid mongoDB _id
    ): Promise<Event[]> {
        return await this.eventModel.find({ 
            category: eventType, 
            eventDate, 
            eventCenter: eventLocation 
        })
        .exec() as Event[];
    }

    //Returns an array of events that haven't been celebrated
    async getOngoingEvents(): Promise<Event[]> {
        try{
            // const expiresIn: number = information.expiration.getTime() - new Date().getTime();
            // const events: Event[] = await this.eventModel.find({
            //      eventDate: {
            //           $gt: new Date().getTime() 
            //         } 
            //     })
            //     .exec();
            const events: Event[] = await this.getEvents();
            return events.filter(event => event.eventDate.getTime() >= new Date().getTime()) as Event[];
        }
        catch(ForbiddenException){
            throw new ForbiddenException("Events could not be fetched");
        }
    }

    async getEventListByYear(): Promise<any> {
        try{
            const dataPayload: any = await this.eventModel.aggregate([
                    {
                        $group: {
                            _id: '$eventYear', // grouping key - group by field district
                            // minPrice: { $min: '$price'}, // we need some stats for each group (for each district)
                            // maxPrice: { $max: '$price'},
                            // flatsCount: { $sum: 1 }
                            }
                    },
                    { 
                        $project: { 
                            eventName: 1,
                            eventDescription: 1,
                            eventGuests: 1,
                            activities: 1,
                            eventCenter: 1,
                            category: 1,
                            eventYear: 1
                        }
                    }
                ]).exec();

                return dataPayload;
        }
        catch(ForbiddenException){
            throw new ForbiddenException("Events not fetched");
        }
    }

    async getEventsByYear(): Promise<any> {
        try {
            const events = await this.getEvents();
            let eventYrs: number[] = [];
    
            /***
             * TODO: Find a way to use a mongoose GroupByQuery to handle the same process in a shorter way
             */
            //filter out each event by year
            events.forEach((event: Event) => {
                if(!eventYrs.find(eventYr => event.eventYear == eventYr)) {
                    eventYrs.push(event.eventYear);
                }
            });
    
            let returnedNode: any[] = [];
            //use the eventYrs to get all events in that year
            eventYrs.forEach(year => {
                const eventList = events.filter(ev => ev.eventYear === year);
    
                let subNode: any = {
                    year,
                    events: eventList
                };
    
                returnedNode.push(subNode);
            });
    
            return returnedNode;
        }
        catch(ForbiddenException){
            throw new ForbiddenException("Fetching events failed");
        }
    }

    //@Patch()
    async editEvent(
        eventId: string,
        eventName?: string,
        eventDescription?: string,
        category?: string,
        state?: string,
        lga?: string,
        eventDate?: Date,
        startTime?: string,
        eventGuests?: string[],
        activities?: string[],
        eventCenter?: string,
        eventCenterText?: string
    ): Promise<Event> {
        try {
            let event = await this.eventModel.findById(eventId);
            if(event){
                if(eventName && event.eventName !== eventName){
                    event.eventName = eventName;
                }
                if(eventDescription && event.eventDescription !== eventDescription){
                    event.eventDescription = eventDescription;
                }
                if(category && event.category !== category){
                    event.category = category;
                }
                if(state && event.state !== state) {
                    event.state = state;
                }
                if(lga && event.lga !== lga){
                    event.lga = lga;
                }
                if(eventDate && event.eventDate !== eventDate){
                    event.eventDate = eventDate;
                    const extractYear = eventDate.toString().split("-")[0];
                    event.eventYear = parseInt(extractYear);
                }
                if(startTime && event.startTime !== startTime){
                    event.startTime = startTime;
                }
                if(eventGuests){
                    let arr = (event.eventGuests as string[]);

                    eventGuests.forEach(ar => {
                        if(!arr.includes(ar)){
                            arr.push(ar);
                        }
                    })
                    //event.eventGuests.push(...editEventDTO.eventGuests);
                }
                if(activities){
                    let activitiesArr = (event.activites as string[]);
                    
                    activities.forEach(ar => {
                        if(!activitiesArr.includes(ar)){
                            activitiesArr.push(ar);
                        }
                    })
                }
                if(eventCenter && event.eventCenter !== eventCenter){
                    event.eventCenter = eventCenter;
                }
                if(eventCenterText && event.eventCenterText !== eventCenterText){
                    event.eventCenterText = eventCenterText;
                }
            }

            return await event.save();
        }
        catch(ForbiddenException){
            throw new ForbiddenException("Event edit failed");
        }
        
        //return await this.eventModel.findByIdAndUpdate(event._id, event, { new: true, useFindandModify: false });
    }

    async deleteEvent(eventId: string): Promise<{ message: string }> {
        try{
            await this.eventModel.deleteOne({ _id: eventId }).exec();
            return { message: "Event Deleted" };
        }
        catch(ForbiddenException){
            throw new ForbiddenException("Deleting event failed");
        }
    }

    private async doesEventExist(eventName: string, postedBy: string): Promise<boolean> {
        return await this.eventModel.exists({ eventName, postedBy });
    }
}