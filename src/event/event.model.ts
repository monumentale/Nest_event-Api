import * as Mongoose from "mongoose";

export const EventSchema = new Mongoose.Schema({
    eventImage: {
        type: String,
        required: true,
        default: "/get-image/art-creative-design-225011.jpg"
    },
    eventName: {
        type: String,
        required: [
            true,
            "Event name is required"
        ]
    },
    eventDescription: {
        type: String,
        required: [
            true,
            "Event description is required"
        ]
    },
    eventGuests: [String],
    activites: [String],
    category: {
        type: Mongoose.Schema.Types.ObjectId, 
        ref: "EventCategory", 
        required: [
            true,
            "Event category is required"
        ] 
    },
    eventCenter: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "EventCenter"
    },
    eventCenterText: {//Parameters holds the eventCenter if it is not found in the select list
        type: String
    },
    state: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: [
            true,
            "State is required"
        ]
    },
    lga: {
        type: String,
        required: [
            true,
            "Lga is required"
        ]
    },
    eventDate: {
        type: Date,
        required: [
            true,
            "Date of event is required"
        ]
    },
    eventYear: {
        type: Number
    },
    startTime: {
        type: String,
        required: [
            true,
            "State time of event is required"
        ]
    },
    postedBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Name of event organizer is required"
        ]
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export interface Event extends Mongoose.Document {
    _id: string;
    eventImage: string;
    eventName: string;
    eventDescription: string;
    eventGuests?: string[];
    activites?: string[];
    category: string;
    eventCenter?: string;
    eventCenterText?: string;
    eventYear?: number;
    state: string;
    lga: string;
    eventDate: Date;
    startTime: string;
    postedBy: string;
    dateCreated: Date;
}