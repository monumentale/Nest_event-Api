import { UserService } from "./user.service";
import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body, 
    Param,
    UseGuards
} from "@nestjs/common";
import { User } from "./user.model";
import { Roles, UserRole } from "../roles/roles.defined";
import { AdminGuard } from "../auth/admin-role.guard";
import { AuthGuard } from "../auth/auth.guard";
import { 
    EditUserDTO, 
    ChangePasswordDTO 
} from './editUserDTO.dto';
import { 
    ApiTags, 
    ApiProduces, 
    ApiConsumes, 
    ApiOperation, 
    ApiForbiddenResponse, 
    ApiOkResponse, 
    ApiBearerAuth, 
    ApiBody
} from "@nestjs/swagger";
import { UserDTO } from './user.dto';
import { SignupDTO } from '../auth/signupDTO.dto';

/***
 * Despite the similarities use Routes: 
 * "/user/sign-up" & 
 * "/user/sign-up-organizer" 
 * to add user in roles of "Admin, Attendee, Organizer"
 */
@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private readonly UserService: UserService){ }

    /**
     * @param firstName [Required]
     * @param lastName [Required]
     * @param password [Required]
     * @param role [Required] defaults to "Attendee"
     * @param email [Optional]
     */
    @Post("sign-up")
    @ApiProduces("json")
    @ApiConsumes("application/json")
    @ApiOperation({
        operationId: "This is an endpoint for signing up a user",
        description: "This is an endpoint for signing up a user"
    })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "User was signed up successfully" })
    async addUser(
        @Body() signUpDTO: SignupDTO
    ): Promise<User> {
        return await this.UserService.addUser(
            signUpDTO.firstName, 
            signUpDTO.lastName, 
            signUpDTO.password, 
            signUpDTO.role, 
            signUpDTO.email
        );
    }

    /**
     * @param firstName [Required]
     * @param lastName [Required]
     * @param password [Required]
     * @param role [Optional]
     * @param email [Optional]
     * @param companyName [Optional]
     * @param companyEmail [Optional]
     * @param companyAddress [Optional]
     * @param companyPhone [Optional]
     * @returns
     * Adds a new User with role of "Organizer"
     */
    @Post("sign-up-organizer")
    @ApiProduces("json")
    @ApiConsumes("application/json")
    @ApiOperation({
        operationId: "Endpoint for registering an ORGANIZATION that can then post events on the App",
        description: "Endpoint for registering an ORGANIZATION that can then post events on the App"
    })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "ORGANIZATION was signed up successfully" })
    async addOrganizer(
        @Body() organizer: UserDTO
    ): Promise<User> {
        return await this.UserService.addOrganizer(
            organizer.firstName, 
            organizer.lastName, 
            organizer.password, 
            organizer.role, 
            organizer.email, 
            organizer.companyName, 
            organizer.companyEmail, 
            organizer.companyAddress, 
            organizer.companyPhone
        );
    }

    /**
     * @param emailAddress 
    */
    @Get("reset-password/:id")
    @ApiProduces("json")
    @ApiOperation({
        operationId: `Return a random generated unique string with SHA-256 encryption that 
        can be used to identify a user through their an email.`,
        description: `It identifies a user by their valid 
        registered EMAIL so it can be used to create a ONE-TIME validator for the user is this context`
    })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "ORGANIZATION was signed up successfully" })
    async getOneTimePassword(@Param("id") emailAddress: string): Promise<any> {
        return await this.UserService.getUserOneTimeValidatorByEmail(emailAddress);
    }

    /**
     * @param oneTimeIdentifier
     * After a User clicks on the link in their email and are rediected; 
     * this endpoint allows their "one-time-identifier" to be validated
     * @returns { userValidated: boolean, userId: string }
     * UserId is returned so it can be used to identify Which user has to chnage their password
     */
    @Get("verify-one-time-identifier/:id")
    @ApiOperation({
        operationId: "This returns a ONE-VALIDATOR as SHA-256 encrypted string",
        description: "This returns a ONE-VALIDATOR as SHA-256 encrypted string"
    })
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "ONE-TIME-UNIQUE validator is valid" })
    async validateOneTimeIdentifier(@Param("id") oneTimeIdentifier: string): 
    Promise<{ userValidated: boolean, userId: string }> {
        const user: User = await this.UserService.validateOneTimeIdentifier(oneTimeIdentifier);
        return { userValidated: (user ? true : false), userId: user?._id };
    }

    /**
     * 
     * @param newPassword [Required]
     * @param userId [Required]
     * User sends a request with their new password and their user id to validate their identity
     */
    @ApiOperation({
        operationId: "Update the user password",
        description: "Update the user password"
    })
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "Password was updated successfully" })
    @ApiBody({ 
        type: ChangePasswordDTO,
        description: "Get the new password"
    })
    @Patch("update-password")
    async updatePassword(
        @Body() changePasswordDTO: ChangePasswordDTO
    ): Promise<User> {
        return await this.UserService.updatePassword(changePasswordDTO.newPassword, changePasswordDTO.userId);
    }

    /***
     * Returns a list of all user regardless of Role
    */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: "This gets a list of all the registered users regardless of their role",
        description: "This gets a list of all the registered users regardless of their role"
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "Returns all the registered users" })
    @Get("get-all-users")
    async getAllUsers(): Promise<User[]> {
        return await this.UserService.getAllUsers();
    }

    /***
     * Returns a list of all users with Role of "Attendee"
    */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users with the Role of: '${UserRole.Attendee}'`,
        description: `Gets an array of all the users with the Role of: '${UserRole.Attendee}'`
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns all the registered users with Role: '${UserRole.Attendee}'` })
    @Get("get-all-attendees")
    async getAllAttendees(): Promise<User[]> {
        return await this.UserService.getAllUsersByRole(Roles.Attendee);
    }

    /***
     * Returns a list of all users with Role of "Organizer"
    */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users with the Role of: '${UserRole.Organizer}'`,
        description: `Gets an array of all the users with the Role of: '${UserRole.Organizer}'`
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns all the registered users with Role: '${UserRole.Organizer}'` })
    @Get("get-all-organizers")
    async getAllOrganizers(): Promise<User[]> {
        return await this.UserService.getAllUsersByRole(Roles.Organizer);
    }

    /**
     * Returns a list of all users with role of "Admin"
     */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users with the Role of: '${UserRole.Admin}'`,
        description: `Gets an array of all the users with the Role of: '${UserRole.Admin}'`
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns all the registered users with Role: '${UserRole.Admin}'` })
    @Get("get-all-admins")
    async getAllAdmins(): Promise<User[]> {
        return await this.UserService.getAllUsersByRole(Roles.Admin);
    }

    /**
     * Count all Users regardless of Role
    */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users`,
        description: `Gets a count of all the users`
    })
    @ApiBearerAuth()
    @ApiProduces("number")
    //@ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns a count all the registered users` })
    @Get("count-all-users")
    async countAllUsers(): Promise<number> {
        return await this.UserService.countAllUsers();
    }

    /**
     * Count all User where Role === "Attendee"
     */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users with role of: '${UserRole.Attendee}'`,
        description: `Gets a count of all the users with role of: '${UserRole.Attendee}'`
    })
    @ApiBearerAuth()
    @ApiProduces("number")
    //@ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns a count all the registered users with role of: '${UserRole.Attendee}'` })
    @Get("count-all-attendees")
    async countAllAttendees(): Promise<number> {
        return await this.UserService.countByRole(Roles.Attendee);
    }

    /**
     * Count all User where Role === "Organizer"
    */
    @UseGuards(AdminGuard)
    @ApiOperation({
        operationId: `Gets an array of all the users with role of: '${UserRole.Organizer}'`,
        description: `Gets a count of all the users with role of: '${UserRole.Organizer}'`
    })
    @ApiBearerAuth()
    @ApiProduces("number")
    //@ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: `Returns a count all the registered users with role of: '${UserRole.Organizer}'` })
    @Get("count-all-organizers")
    async countAllOrganizers(): Promise<number> {
        return await this.UserService.countByRole(Roles.Organizer);
    }

    /**
     * @param userId [Required]
     * Deletes a user based on the user._id passed to the backend
     * @returns { message: string }
    */
    @ApiOperation({
        operationId: "Deletes a user identified by a valid MONGO_DB _id",
        description: "Deletes a user identified by a valid MONGO_DB _id"
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiOkResponse({ description: "Deletes a user identified by a valid MONGO_DB _id" })
    @UseGuards(AdminGuard)
    @Delete("delete-user/:id")
    async deleteUser(@Param("id") userId: string): Promise<{ message: string }> {
        return await this.UserService.deleteUserById(userId);
    }

    /**
     * @param userId 
     * @param firstName 
     * @param lastName 
     * @param password 
     * @param role 
     * @param email 
     * @param companyName 
     * @param industry 
     * @param website 
     * @param companyEmail 
     * @param companyPhone 
     * @param companyAddress 
    */
    @UseGuards(AuthGuard)
    @ApiOperation({
        operationId: "Update the user's details",
        description: "Update the user's details"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "User was updated succesfully"})
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiBearerAuth()
    @ApiConsumes("application/json")
    @ApiBody({ 
        type: EditUserDTO,
        description: "User update type" 
    })
    @Patch("edit-user/:id")
    async editUser(
        @Param("id") userId: string,
        @Body() editUserDTO: EditUserDTO
        // @Body("firstName") firstName: string,
        // @Body("lastName") lastName: string,
        // @Body("password") password?: string,
        // @Body("role") role?: "Attendee" | "Organizer" | "Admin",
        // @Body("email") email?: string,
        // @Body("companyName") companyName?: string,
        // @Body("industry") industry?: string,
        // @Body("website") website?: string,
        // @Body("companyEmail") companyEmail?: string,
        // @Body("companyPhone") companyPhone?: string,
        // @Body("companyAddress") companyAddress?: string
        ): Promise<User> {
            return await this.UserService.updateAttendeeUser(
                userId, 
                editUserDTO.firstName, 
                editUserDTO.lastName, 
                editUserDTO.password, 
                editUserDTO.role, 
                editUserDTO.email, 
                editUserDTO.companyName, 
                editUserDTO.industry, 
                editUserDTO.website, 
                editUserDTO.companyEmail, 
                editUserDTO.companyPhone, 
                editUserDTO.companyAddress
            );
    }
    
}