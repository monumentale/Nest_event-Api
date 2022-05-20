import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from '../roles/roles.defined';

export class ChangePasswordDTO {
    @ApiProperty({
        type: String,
        description: "The new password entered by the user",
        required: true
    })
    public readonly newPassword: string;

    @ApiProperty({
        type: String,
        description: "The new password entered by the user. Must be a valid MONGO_DB _id",
        required: true
    })
    public readonly userId: string;
}

export class EditUserDTO {
    @ApiProperty({
        type: String,
        description: "Reset user's first name",
        required: true
    })
    public readonly firstName: string;

    @ApiProperty({
        type: String,
        description: "Reset user's last name",
        required: true
    })
    public readonly lastName: string;

    @ApiProperty({
        type: String,
        description: "Reset user's password",
        required: false
    })
    public readonly password?: string;

    @ApiProperty({
        type: String,
        enum: UserRole,
        description: "Reset user's Role",
        required: false
    })
    public readonly role?: string;

    @ApiProperty({
        type: String,
        description: "Reset user's email",
        required: false,
        uniqueItems: true
    })
    public readonly email?: string;

    @ApiProperty({
        type: String,
        description: "Reset user's company name",
        required: false
    })
    public readonly companyName?: string;

    @ApiProperty({
        type: String,
        description: "Reset ORGANIZATION'S industry",
        required: false
    })
    public readonly industry?: string;

    @ApiProperty({
        type: String,
        description: "Reset ORGANIZATION'S website url",
        required: false
    })
    public readonly website?: string;

    @ApiProperty({
        type: String,
        description: "Reset ORGANIZATION'S cmpany email",
        required: false
    })
    public readonly companyEmail?: string;

    @ApiProperty({
        type: String,
        description: "Reset ORGANIZATION'S company phone number",
        required: false
    })
    public readonly companyPhone?: string;

    @ApiProperty({
        type: String,
        description: "Reset ORGANIZATION'S company address",
        required: false
    })
    public readonly companyAddress?: string;
}