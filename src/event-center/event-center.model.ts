import * as Mongoose from "mongoose";

export const EventCenterSchema = new Mongoose.Schema({
    eventCenterName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface EventCenter extends Mongoose.Document {
    _id: string;
    eventCenterName: string;
    dateCreated? :Date;
}