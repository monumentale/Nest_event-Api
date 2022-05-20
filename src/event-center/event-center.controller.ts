import { 
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Body, 
    UseGuards
} from '@nestjs/common';
import { EventCenterService } from './event-center.service';
import { AdminGuard } from '../auth/admin-role.guard';
import { 
    ApiTags, 
    ApiConsumes, 
    ApiForbiddenResponse, 
    ApiCreatedResponse, 
    ApiOperation, 
    ApiBearerAuth, 
    ApiOkResponse 
} from '@nestjs/swagger';
import { EventCenterDTO } from './event-center.dto';

@ApiTags("event-center")
@Controller('event-center')
export class EventCenterController {
    constructor(private readonly eventCenterService: EventCenterService){ }

    @ApiOperation({ 
        operationId: "Event center creation",
        description: "Event center creation"
    })
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'The event center has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiConsumes('application/json')
    @UseGuards(AdminGuard)
    @Post("add-event-center")
    async addEventCategory(@Body() eventCenterDTO: EventCenterDTO): Promise<EventCenterDTO> {
        return await this.eventCenterService.addEventCenter(eventCenterDTO);
    }

    @ApiOperation({ 
        operationId: "Get all event centers",
        description: "Get all event centers"
    })
    @ApiOkResponse({ description: 'Event centers were successfully retrieved.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Get("get-event-centers")
    async getEventCategories(): Promise<EventCenterDTO[]> {
        return await this.eventCenterService.getEventCenters();
    }

    @ApiOperation({ 
        operationId: "Get an event center by its _id",
        description: "Get an event center by its _id"
    })
    @ApiOkResponse({ description: 'Event center were successfully retrieved.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Get("get-event-center/:id")
    async getEventCategory(@Param("id") centerId: string): Promise<EventCenterDTO> {
        return this.eventCenterService.getEventCenter(centerId);
    }

    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({ 
        operationId: "Delete an event center by its _id",
        description: "Delete an event center by its _id"
    })
    @ApiOkResponse({ description: 'Event center were successfully deleted.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Delete("delete-event-center/:id")
    async deleteEventCategory(@Param("id") centerId: string): Promise<{ message: string }> {
        return await this.eventCenterService.deleteEventCenter(centerId);
    }
}