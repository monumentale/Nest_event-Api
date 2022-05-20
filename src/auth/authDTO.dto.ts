import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({
        type: String,
        description: "Username of the user",
        required: true
    })
    public readonly username: string;

    @ApiProperty({
        type: String,
        description: "Password of the user",
        required: true
    })
    public readonly password: string;
}