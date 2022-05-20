import { ApiProperty } from "@nestjs/swagger";

export class EventDTO {
    @ApiProperty({
        type: String,
        description: "The cover image added for any event",
        format: "binary"
    })
    public eventImage: string;

    @ApiProperty({
        type: String, 
        description: "Name of the event",
        required: true
    })
    public readonly eventName: string;

    @ApiProperty({
        type: String,
        description: "The description of the event",
        required: true
    })
    public readonly eventDescription: string;

    @ApiProperty({
        type: [String],
        description: "the guests for the 'event' in this context"
    })
    public readonly eventGuests: string[];

    @ApiProperty({
        type: [String],
        description: "The 'activities' for the event in this context"
    })
    public readonly activites: string[];

    @ApiProperty({
        type: String,
        description: `A Valid MONGO_DB _id detailing the category to which the 'event'
        in this context belongs to`,
        required: true
    })
    public readonly category: string;

    @ApiProperty({
        type: String,
        description: "The venue of the event"
    })
    public readonly eventCenter: string;

    @ApiProperty({
        type: String,
        description: "Text describing the venue of the event"
    })
    public readonly eventCenterText: string;

    @ApiProperty({
        type: String,
        description: `A valid MONGO_DB id identifying the state that serves as 
        the venue for the event in this context`,
        required: true
    })
    public readonly state: string;

    @ApiProperty({
        type: String,
        description: `LGA represented as raw text, telling the name of the
        LGA which serves a the venue for the event`,
        required: true
    })
    public readonly lga: string;

    @ApiProperty({
        type: Date,
        description: `The date of the 'event' in this context`,
        required: true
    })
    public eventDate: Date;

    @ApiProperty({
        type: Number,
        description: `The year on which the event is to take place`,
        //required: true
    })
    public readonly eventYear: number;

    @ApiProperty({
        type: String,
        description: `The time when the event is to begin`,
        required: true
    })
    public readonly startTime: string;

    @ApiProperty({
        type: Date,
        description: `The date and time when the event was created`
    })
    public readonly dateCreated: Date;
}