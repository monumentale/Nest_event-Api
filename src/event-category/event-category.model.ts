import * as Mongoose  from "mongoose";

export const EventCategorySchema = new Mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface EventCategory extends Mongoose.Document {
    _id: string;
    categoryName: string;
    dateCreated?: Date;
}