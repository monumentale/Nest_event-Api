import { 
    Controller,
    Post,
    Get,
    Delete,
    Query,
    Patch,
    Body,
    Param,
    Req,
    UseInterceptors,
    UploadedFile,
    UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { EventService } from './event.service';
import { Event } from "./event.model";
import { MulterValidators } from '../validatrors/multer.validator';
import { OrganizerGuard } from '../auth/organizer-role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { 
    ApiTags, 
    ApiOperation, 
    ApiProduces, 
    ApiBearerAuth, 
    ApiConsumes, 
    ApiCreatedResponse, 
    ApiForbiddenResponse, 
    ApiOkResponse, 
    ApiBody 
} from '@nestjs/swagger';
import { EventDTO } from './event.dto';
import { EventCategoryLocationDTO } from './eventCategoryLocationDTO.dto';
import { EditEventDTO } from "./editEventDTO.dto";

@ApiTags("event")
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService){ }

    // /**
    //  * @param req 
    //  * @param eventImage [Optional]
    //  * @param eventName 
    //  * @param eventDescription 
    //  * @param category 
    //  * @param state 
    //  * @param lga 
    //  * @param eventDate 
    //  * @param startTime 
    //  * @param postedBy 
    //  * @param eventGuests 
    //  * @param activities 
    //  * @param eventCenter 
    //  * @param eventCenterText 
    //  */
    // @ApiOperation({ 
    //     operationId: "Event creation",
    //     description: "Event creation"
    // })
    // @ApiBearerAuth()
    // @ApiProduces("json")
    // @ApiConsumes("multipart/formdata")
    // @ApiCreatedResponse({ description: "The event was added successfully" })
    // @ApiForbiddenResponse({ description: "Forbidden" })
    // @UseGuards(OrganizerGuard)
    // @Post("add-event")
    // @UseInterceptors(
    //     FileInterceptor("eventImage", {
    //         storage: diskStorage({
    //             destination: "./uploads",
    //             fileName: MulterValidators.editFileName
    //         }),
    //         fileFilter: MulterValidators.imageFileFilter
    //     })
    // )
    // async addEvent(
    //     @Req() req,
    //     @UploadedFile() eventImage,
    //     @Body() eventDTO: EventDTO,
    // ): Promise<EventDTO | any> {

    //     if(eventImage) {
    //         eventDTO.eventImage = `${req.protocol}://${req.get("host")}/get-image/${eventImage.filename}`;
    //     }
    //     return await this.eventService.addEvent(
    //         eventDTO.eventName,
    //         eventDTO.eventDescription,
    //         eventDTO.category,
    //         eventDTO.state,
    //         eventDTO.lga,
    //         eventDTO.eventDate,
    //         eventDTO.startTime,
    //         req.userData._id,//extract from JWT Token
    //         //eventDTO.postedBy,
    //         eventDTO.eventGuests,
    //         eventDTO.activites,
    //         eventDTO.eventCenter,
    //         eventDTO.eventCenterText,
    //         eventDTO.eventImage
    //     );
    // }

    /**
     * @param eventId 
     * @param eventName 
     * @param eventDescription 
     * @param category 
     * @param state 
     * @param lga 
     * @param eventDate 
     * @param startTime 
     * @param eventGuests 
     * @param activities 
     * @param eventCenter 
     * @param eventCenterText
     * All Parameters are optional 
     */
    @UseGuards(OrganizerGuard)
    @ApiProduces("json")
    @ApiBearerAuth()
    @ApiConsumes("application/json")
    @ApiCreatedResponse({ description: "The event was updated successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @ApiBody({ 
        type: EditEventDTO, 
        description: "Edit event DTO" 
    })
    @Patch("edit-event/:id")
    async editEvent(
        @Param("id") eventId: string,
        @Body() editEventDTO: EditEventDTO
    ): Promise<Event> {
        return await this.eventService.editEvent(
            eventId,
            editEventDTO.eventName,
            editEventDTO.eventDescription,
            editEventDTO.category,
            editEventDTO.state,
            editEventDTO.lga,
            editEventDTO.eventDate,
            editEventDTO.startTime,
            editEventDTO.eventGuests,
            editEventDTO.activities,
            editEventDTO.eventCenter,
            editEventDTO.eventCenterText
        );
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        operationId: "Get all Events by year",
        description: "Get all Events by year"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The events were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-events-by-year")
    async getEventsByYear(): Promise<Event> {
        return await this.eventService.getEventsByYear();
    }

    @ApiOperation({ 
        operationId: "Get all Events by groupd by year",
        description: "Get all Events by groupd by year"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The events were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-event-years")
    async getEventListByYear(): Promise<any> {
        return await this.eventService.getEventListByYear();
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ 
        operationId: "Get all Events",
        description: "Get all Events"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The events were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-events")
    async getEvents(): Promise<Event[]> {
        return await this.eventService.getEvents();
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        operationId: "Get an Event  by it's creator user _id",
        description: "Get an Event by it's creator user _id"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The event was retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-events-by-user/:id")
    async getEventsByUser(@Param("userId") userId: string): Promise<Event[]> {
        return await this.eventService.getEventsByUser(userId);
    }

    @UseGuards(AuthGuard)
    @ApiBody({
        type: EventCategoryLocationDTO
    })
    @ApiProduces("json")
    @ApiBearerAuth()
    @ApiOperation({ 
        operationId: "Get Events by their location, date & type",
        description: "Get Events by their location, date & type"
    })
    @ApiOkResponse({ description: "The events were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-events-by-type-date-location")
    async getEventsByTypeDateLocation(
        @Query() eventCategoryLocationDTO: EventCategoryLocationDTO
    ): Promise<Event[]> {
        return await this.eventService.getEventByTypeLocationAndDate(
            eventCategoryLocationDTO.eventType, 
            eventCategoryLocationDTO.eventDate, 
            eventCategoryLocationDTO.location
        );
    }

    @UseGuards(OrganizerGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        operationId: "Delete an Event  by it's _id",
        description: "Delete an Event by it's _id"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The event was deleted successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Delete("delete-event/:id")
    async deleteEvent(@Param("id") eventId: string): Promise<{ message: string }> {
        return await this.eventService.deleteEvent(eventId);
    }
}