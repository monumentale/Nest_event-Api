import { ApiProperty } from "@nestjs/swagger";

export class LGADTO {
    @ApiProperty({
        required: false,
        type: String
    })
    lgaName: string;

    @ApiProperty({
        required: false,
        type: Date
    })
    dateCreated?: Date;
}

export class StateDTO {
    @ApiProperty({
        type: String,
        description: "State name",
        required: true
    })
    public readonly stateName: string;

    @ApiProperty({
        description: "Lgas in a state",
        required: false,
        type: [LGADTO]//Make allows for creating a subDTO for an array of objects
    })
    public lgas?: LGADTO[];

    @ApiProperty({
        type: Date,
        description: "The date when state was added to the database"
    })
    public readonly dateCreated: Date;
}