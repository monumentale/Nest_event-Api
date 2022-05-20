import { 
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param, 
    UseGuards
} from '@nestjs/common';
import { StateService } from './state.service';
import { 
    State, 
    LgaType 
} from './state.model';
import { AdminGuard } from '../auth/admin-role.guard';
import { 
    ApiProduces, 
    ApiForbiddenResponse, 
    ApiOkResponse, 
    ApiTags, 
    ApiHeader,
    ApiConsumes,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOperation,
    ApiBody
} from '@nestjs/swagger';
import { StateDTO } from './state.dto';
import { LGAEditDTO } from './LgaEditDTO.dto';

@ApiTags("state")
@Controller('state')
export class StateController {
    constructor(private readonly stateService: StateService){ }

    /**
     * Creates a state with lgas as an optional parameter
     */
    @UseGuards(AdminGuard)
    @ApiOperation({ 
        operationId: "State creation",
        description: "State creation"
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiConsumes("application/json")
    @ApiCreatedResponse({ description: "The state was added successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Post("add-state") 
    async addState(@Body() stateDTO: StateDTO): Promise<State> {
        return await this.stateService.addState(stateDTO);
    }

    /**
     * @param stateId [Required]
     * @param lga [Required]
     * add state to 
     */
    @UseGuards(AdminGuard)
    @ApiOperation({ 
        operationId: "Add Lgas to an existing state",
        description: "Add Lgas to an existing state"
    })
    @ApiBearerAuth()
    @ApiProduces("json")
    @ApiBody({ //Defines a Temporary DTO for the Update operation
        type: LGAEditDTO, 
        description: "LGA update type" 
    })
    @ApiOkResponse({ description: "The LGA was added successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Patch("add-lga-to-state")
    async addLgaToState(
        @Body() LGAEdit: LGAEditDTO
    ): Promise<State> {
        return await this.stateService.addLgaToState(LGAEdit.stateId,LGAEdit.lga);
    }

    /**
     * Gets all States from the DB amd converts them in a list
     */
    @ApiOperation({ 
        operationId: "Get all States",
        description: "Get all States"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The States were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-states")
    async getStates(): Promise<State[]> {
        return await this.stateService.getStates();
    }

    /**
     * @param stateId [Required]
     * Get a single state based on is stateId
     */
    @ApiOperation({ 
        operationId: "Get a State by it's _id",
        description: "Get a State by it's _id"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The State was retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-state/:id")
    async getState(@Param("id") stateId: string): Promise<State> {
        return await this.stateService.getState(stateId);
    }

    /**
     * @param stateId [Required]
     * Get list of all lgas under a state
     */
    @ApiOperation({ 
        operationId: "Get Lgas under a state by _id",
        description: "Get Lgas under a state by _id"
    })
    @ApiProduces("json")
    @ApiOkResponse({ description: "The LGAs were retrieved successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Get("get-state-lgas/:id")
    async getLgas(@Param("id") stateId: string): Promise<LgaType[]> {
        return await this.stateService.getLgas(stateId);
    }

    /**
     * @param stateId [Required]
     * Deletes a state identified with stateId
     */
    @UseGuards(AdminGuard)
    @ApiOperation({ 
        operationId: "State deleted",
        description: "State deleted"
    })
    @ApiBearerAuth()
    @ApiOkResponse({ description: "The state was deleted successfully" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @Delete("delete-state/:id")
    async deleteState(@Param("id") stateId: string): Promise<{ message: string }> {
        return await this.stateService.deleteState(stateId);
    }
}