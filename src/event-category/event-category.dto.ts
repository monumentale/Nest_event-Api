import { ApiProperty } from "@nestjs/swagger";

export class EventCategoryDTO {
    @ApiProperty({
        type: String,
        required: true,
        description: "The name of the event category"
    })
    public readonly categoryName: string;

    @ApiProperty({
        type: Date,
        description: "The date on which the event category was created",
        required: false,
        //default: Date.now
    })
    public readonly dateCreated: Date;
}