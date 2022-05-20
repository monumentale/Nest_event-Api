import { ApiProperty } from "@nestjs/swagger";

export class LGAEditDTO {
    @ApiProperty({
        type: String,
        required: true,
        description: "_id of the state to which the LGA belongs"
    })
    public readonly stateId: string;

    @ApiProperty({
        type: String,
        required: true,
        description: "Name of Lga"
    })
    public readonly lga: string;
}