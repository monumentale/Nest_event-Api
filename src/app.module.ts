import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";//used for multer module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { EventCategoryModule } from './event-category/event-category.module';
import { EventModule } from './event/event.module';
import { EventCenterModule } from './event-center/event-center.module';
import { AuthModule } from './auth/auth.module';
import * as process from "process";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://WILDcard:IamMax22@eventsapp-ygbay.mongodb.net/test?retryWrites=true&w=majority&authSource=admin";
const MONGO_LOCAL_URI = "mongodb://localhost:27017/eventsAppDB";
@Module({
  imports: [
    //Init Mongoose on "AppRoot"
    MongooseModule.forRoot(
      MONGO_URI,
      //MONGO_LOCAL_URI, 
      { 
        //useUnifiedTopology: false,//PRODUCTION OPTION
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true//added to new version of mongoose 
      }),
      // MulterModule.register({
      //   dest: "./uploads"
      // }),
      UserModule,
      StateModule,
      EventCategoryModule,
      EventModule,
      EventCenterModule,
      AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }