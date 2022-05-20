import { 
    Controller, 
    Post, 
    Body 
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ApiTags, ApiProduces, ApiOperation, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthDTO } from "./authDTO.dto";
import { SignupDTO } from './signupDTO.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService){ }

    /**
     * @param username 
     * @param password 
     * In the context of this end-point, the field 'Username' refers the user's email
     * The user's email is their Username
     */
    @Post("login")
    @ApiProduces("json")
    @ApiOperation({ 
        operationId: "Event center creation",
        description: "Event center creation"
    })
    @ApiOkResponse({ description: "User was logged in successfully" })
    @ApiForbiddenResponse({ description: "The user failed to login" })
    async login(
        @Body() authDTO: AuthDTO
    ): Promise<any> {
        const user = await this.userService.getUserByEmailAndPassword(authDTO.username, authDTO.password);
        //ISSUE has to do with Password-Hashing
        //construct a payload for the user, using username & dateCreated
        const payload: { _id: string, email: string, dateCreated: Date } = {
            _id: user._id,
            email: user.email,
            dateCreated: user.dateCreated
        };

        //create the token
        const token = await this.authService.signPayload(payload);
        return { 
            user: 
            { //carry out this mapping of the user object to avoid putting the password into the server's response
                _id: user._id, 
                email: user.email, 
                role: user.role,
                dateCreated: user.dateCreated
            },
            token, 
            expiresIn: this.authService.getTokenExpiresIn() 
        };
    }

    /**
     * @param firstName 
     * @param lastName 
     * @param role 
     * @param email 
     * @param password 
     */
    @Post("register")
    async register(
        @Body() signupDTO: SignupDTO
    ): Promise<any> {
        const user = await this.userService.addUser(
            signupDTO.firstName, 
            signupDTO.lastName, 
            signupDTO.password, 
            signupDTO.role, 
            signupDTO.email
        );

        const payload: { email: string, dateCreated: Date } = {
            email: user.email,
            dateCreated: user.dateCreated
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}