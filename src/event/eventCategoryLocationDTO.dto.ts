import { ApiProperty } from "@nestjs/swagger";

export class EventCategoryLocationDTO {
    @ApiProperty({
        type: String,
        required: true,
        description: "Valid MONGO_ID that points to an existing event type"
    })
    public readonly eventType: string;

    @ApiProperty({
        type: String,
        description: "Location of the event",
        required: true
    })
    public readonly location: string;

    @ApiProperty({
        type: Date,
        description: "Date of the event",
        required: true
    })
    public readonly eventDate: Date;
}