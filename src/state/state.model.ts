import * as Mongoose from "mongoose";

export const StateSchema = new Mongoose.Schema({
    stateName: {
        type: String,
        required: true
    },
    lgas: [
        {
            lgaName: {
                type: String,
                required: true
            },
            dateCreated: {
                type: Date,
                default: Date.now
            }
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

export interface State extends Mongoose.Document {
    _id: string;
    stateName: string;
    Lgas?: LgaType[];
    dateCreated: Date;
}

export interface LgaType {
    LgaName: string;
    dateCreated?: Date;
}