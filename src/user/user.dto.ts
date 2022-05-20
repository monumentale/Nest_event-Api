import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from '../roles/roles.defined';

export class UserDTO {
    @ApiProperty({
        type: String,
        description: "The first name of a user",
        required: true
    })
    readonly firstName: string;

    @ApiProperty({
        type: String,
        description: "The last name of a user",
        required: true
    })
    readonly lastName: string;

    @ApiProperty({
        type: String,
        required: true,
        minLength: 6,
        maxLength: 8,
        description: "User's password is converted to using bcrypt and stored"
    })
    readonly password: string;

    @ApiProperty({
        type: String,
        description: "User's email address",
        uniqueItems: true,
        required: false
    })
    readonly email?: string;

    @ApiProperty({
        type: Date,
        //default: Date.now,
        required: true,
        description: "The date and timestamp when the user signs up"
    })
    readonly dateCreated: Date;

    @ApiProperty({
        enum: UserRole,
        type: String,
        required: true,
        default: UserRole.Attendee
    })
    public readonly role: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Random string generated as temp user authenticator when a user forgets their password"
    })
    public readonly oneTimeValidator?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Company name. Only accepted if the user is an 'Organizer'"
    })
    public readonly companyName?: string;

    @ApiProperty({
        type: String,
        description: "Industry name. Only accepted if the user is an 'Organizer'"
    })
    public readonly industry?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Organization's website URL. Only accepted if the user is an 'Organizer'"
    })
    public readonly website?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Company email. Only accepted if the user is an 'Organizer'"
    })
    public readonly companyEmail?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Company phone number. Only accepted if the user is an 'Organizer'"
    })
    public readonly companyPhone?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: "Company address. Only accepted if the user is an 'Organizer'"
    })
    public readonly companyAddress?: string;
}