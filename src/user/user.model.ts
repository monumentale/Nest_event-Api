import * as Mongoose from "mongoose";
import * as MongooseUniqueValidator from "mongoose-unique-validator";
import { Roles } from "../roles/roles.defined";

export const UserSchema = new Mongoose.Schema({
    profileImage: {
        type: String, 
        required: true, 
        default: "/get-image/user_icon.png" 
    },
    firstName: {
        type: String,
        required: [ 
            true,
            "First name is required"
        ]
    },
    lastName: {
        type: String,
        required: [ 
            true,
            "Last name is required"
        ]
    },
    password: {
        type: String, 
        required: [
            true,
            "User password is required"
        ],
        minLength: [
            6,
            "Miniumum Password characters is 6"
        ],
        maxLength: [
            8,
            "Maximum Password characters is 8"
        ]
    },
    email: {
        type: String,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    role: {
        type: String,
        required: [
            true, 
            "User's role must be defined"
        ],
        default: Roles.Attendee
    },
    //This Value is used to create a one-time random string generated for Validating user and resetting password
    oneTimeValidator: {
        type: String
    },
    //Create Additional Parameters for Company_Details if the User's Role === 'Organizer'
    companyName: {
        type: String
    },
    industry: {
        type: String
    },
    website: {
        type: String
    },
    companyEmail: {
        type: String
    },
    companyPhone: {
        type: String
    },
    companyAddress: {
        type: String
    }
});

//Add MongooseUniqueValidator to enforce uniqueness on the Email field
UserSchema.plugin(MongooseUniqueValidator);

export interface User extends Mongoose.Document {
    _id: string;
    profileImage: string;
    firstName: string;
    lastName: string;
    password: string;
    email?: string;
    dateCreated: Date;
    role: "Attendee" | "Organizer" | "Admin";
    oneTimeValidator?: string;
    //Organizer Details
    companyName?: string;
    companyEmail?: string;
    companyPhone?: string;
    companyAddress?: string;
    industry?: string;
    website?: string;
}