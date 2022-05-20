import { ApiProperty } from "@nestjs/swagger";

export class EditEventDTO {
    @ApiProperty({
        type: String,
        required: false,
        description: "Event name(optional)"
    })
    public readonly eventName?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Event description(optional)"
    })
    public readonly eventDescription?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Event Category(optional)"
    })
    public readonly category?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "State(optional)"
    })
    public readonly state?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "LGA which serves as the event's venue(optional)"
    })
    public readonly lga?: string;

    @ApiProperty({
        type: Date,
        required: false,
        description: "Event Date(optional)"
    })
    public readonly eventDate?: Date;

    @ApiProperty({
        type: String,
        required: false,
        description: "Event Start time(optional)"
    })
    public readonly startTime?: string;

    @ApiProperty({
        type: [String],
        required: false,
        description: "Event Guests(optional)"
    })
    public readonly eventGuests?: string[];

    @ApiProperty({
        type: [String],
        required: false,
        description: "Event Activities(optional)"
    })
    public readonly activities?: string[];

    @ApiProperty({
        type: String,
        required: false,
        description: "Event Center(optional)"
    })
    public readonly eventCenter?: string;

    @ApiProperty({
        type: [String],
        required: false,
        description: "Event Center text(optional)"
    })
    public readonly eventCenterText?: string;
}