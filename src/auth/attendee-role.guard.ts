import { 
    CanActivate, 
    Injectable, 
    ExecutionContext,
    HttpStatus,
    HttpException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { decode } from "jsonwebtoken";
import { Roles } from "../roles/roles.defined";

@Injectable()
export class AttendeeGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): Observable<boolean> | boolean | Promise<boolean> {
        try{
            //get the request from http
            const request = context.switchToHttp().getRequest();
            return this.validateRequest(request);
        }
        catch(NotFoundException) {
            throw new HttpException("Forbidden...Role reserved for admin", HttpStatus.FORBIDDEN);
        }
    }


    private validateRequest(request: any): Observable<boolean> | Promise<boolean> | boolean {
        let returnValue: boolean = false;
        const errorMessage: string = "Forbidden...Role reserved for attendees";

        if(request.headers.authorization){
            const rawToken: string = (request.headers.authorization as string).split(" ")[1];//splits token that will be prefixed by string: "Bearer"
            //decode the token
            const decodedToken: any = decode(rawToken);

            if(decodedToken){
                //set the decoded token back along with the httpControllers so they can access the refined version of the token
                request.userData = {
                    _id: decodedToken._id,
                    email: decodedToken.username,
                    role: decodedToken.role,
                    datecreated: decodedToken.dateCreated
                };

                if(decodedToken.role = Roles.Attendee) {//allow only if the user is an admin
                    returnValue = true;
                }
                else throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
            }
        }
        else throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);

        return returnValue;
    }
}