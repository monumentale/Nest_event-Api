import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service"
import { UserController } from "./user.controller";
import { UserSchema } from "./user.model";


@Module({
    imports: [
        MongooseModule.forFeature([{
                name: "UserSchema", 
                schema: UserSchema 
            }])
    ],
    providers: [ UserService ],
    controllers: [ UserController ],
    exports: [ UserService ]//For Injecting this service into another module
})
export class UserModule {}
