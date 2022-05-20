import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../roles/roles.defined";

export class SignupDTO {
    @ApiProperty({
        type: String,
        description: "User's first name",
        required: true
    })
    public readonly firstName: string;

    @ApiProperty({
        type: String,
        description: "User's last name",
        required: true
    })
    public readonly lastName: string;

    @ApiProperty({
        type: String,
        description: "User's designated password",
        required: true
    })
    public readonly password: string; 

    @ApiProperty({
        enum: UserRole,
        type: String,
        description: "User's first name",
        required: false,
        default: UserRole.Attendee
    })
    public readonly role?: string;

    @ApiProperty({
        type: String,
        description: "User's email address",
        required: false
    })
    public readonly email?: string;
}