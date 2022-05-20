import { ApiProperty } from "@nestjs/swagger";

export class EventCenterDTO {
    @ApiProperty({
        type: String, 
        required: true,
        description: "The name of an event center"
    })
    public eventCenterName: string;

    @ApiProperty({
        type: Date,
        required: true,
        description: "The date when an new event center was created",
        //default: Date.now
    })
    public readonly dateCreated: Date;
}