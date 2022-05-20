import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    HttpException,
    HttpStatus
} from "@nestjs/common";
import { decode } from "jsonwebtoken";
import { Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {//this is authGuard validates all users with a token with role: "user"
    canActivate(context: ExecutionContext): Observable<boolean> | boolean | Promise<boolean> {
        try{
            //get the request from http
            const request = context.switchToHttp().getRequest();
            return this.validateRequest(request);
        }
        catch(NotFoundException) {
            throw new HttpException("Forbidden...Authorization headers were not set", HttpStatus.FORBIDDEN);
        }
    }

    private validateRequest(request: any): Observable<boolean> | Promise<boolean> | boolean {
        let returnValue: boolean = false;

        if(request.headers.authorization){
            const rawToken: string = (request.headers.authorization as string).split(" ")[1];//splits token that will be prefixed by string: "Bearer"
            //decode the token
            const decodedToken: any = decode(rawToken);

            if(decodedToken){
                //set the decoded token back along with the httpControllers so they can access the refined version of the token
                request.userData = {
                    _id: decodedToken._id,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    datecreated: decodedToken.dateCreated
                };

                returnValue = true;
            }
        }
        else throw new HttpException("Forbidden...Authorization headers were not set", HttpStatus.FORBIDDEN);

        return returnValue;
    }
   
}