import { 
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param, 
    UseGuards
} from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategory } from './event-category.model';
import { AdminGuard } from "../auth/admin-role.guard";
import { 
    ApiTags, 
    ApiOperation, 
    ApiBearerAuth, 
    ApiForbiddenResponse, 
    ApiCreatedResponse, 
    ApiConsumes, 
    ApiOkResponse 
} from '@nestjs/swagger';
import { EventCategoryDTO } from './event-category.dto';

@ApiTags("event-category")
@Controller('event-category')
export class EventCategoryController {
    constructor(private readonly eventCategoryService: EventCategoryService){ }

    @UseGuards(AdminGuard)
    @ApiOperation({ 
        operationId: "Event category creation",
        description: "Event category creation"
    })
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'The event category has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiConsumes('application/json')
    @Post("add-event-category")
    async addEventCategory(@Body() eventCategoryDTO: EventCategoryDTO): Promise<EventCategoryDTO> {
        return await this.eventCategoryService.addEventCategory(eventCategoryDTO);
    }

    @ApiOperation({ 
        operationId: "Get event categories",
        description: "Get event categories"
    })
    @ApiOkResponse({ description: "Event categories were retrieved successfully" })
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Get("get-event-categories")
    async getEventCategories(): Promise<EventCategoryDTO[]> {
        return await this.eventCategoryService.getEventCategories();
    }

    @ApiOperation({ 
        operationId: "Get event category by its _id",
        description: "Get event category its _id"
    })
    @ApiOkResponse({ description: "Event category were retrieved successfully" })
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Get("get-event-category/:id")
    async getEventCategory(@Param("id") categoryId: string): Promise<EventCategory> {
        return this.eventCategoryService.getEventCategory(categoryId);
    }

    @UseGuards(AdminGuard)
    @ApiOperation({ 
        operationId: "Delete event category by its _id",
        description: "Delete event category its _id"
    })
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Event category were deleted successfully" })
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @Delete("delete-event-category/:id")
    async deleteEventCategory(@Param("id") categoryId: string): Promise<{ message: string }> {
        return await this.eventCategoryService.deleteEventCategory(categoryId);
    }
}