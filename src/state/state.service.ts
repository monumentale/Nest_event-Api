import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { State, LgaType } from './state.model';
import { StateDTO } from './state.dto';

@Injectable()
export class StateService {
    constructor(@InjectModel("StateSchema") private readonly stateModel: Model<State>){ }

    //@Post()
    async addState(stateDTO: StateDTO): Promise<State> {
        if(await this.doesStateExist(stateDTO.stateName)){
            throw new ForbiddenException("This state already exists");
        }

        let state: any;
        if(stateDTO.lgas){
            let lgaArray = [...stateDTO.lgas];

            state = new this.stateModel({
                stateName: stateDTO.stateName, 
                lgas: lgaArray 
            });
        }
        else {
            state = new this.stateModel({ 
                stateName: stateDTO.stateName
            });
        }
        return await state.save() as State;
    }

    async addLgaToState(stateId: string, lga: string): Promise<State> {
        const state = await this.stateModel.findById(stateId);
        if(state){
            state.lgas.push({ lgaName: lga });
        }

        return await state.save();
    }

    async getStates(): Promise<State[]> {
        try{
            return await this.stateModel.find({ }).sort({ stateName: "desc" }).exec() as State[];
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch States");
        }
    }

    async getState(stateId: string): Promise<State> {
        try{
            return await this.stateModel.findById(stateId).exec() as State;
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch State");
        }
    }

    async getLgas(stateId: string): Promise<LgaType[]> {
        try{
            const state = await this.stateModel.findById(stateId).exec();
            return state.lgas;
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Could not fetch State");
        }
    }

    //@Delete
    async deleteState(stateId: string): Promise<any>{
        try {
            await this.stateModel.deleteOne({ _id: stateId }).exec();
            return { message: "State Deleted" };
        }
        catch(ForbiddenException) {
            throw new ForbiddenException("Delete failed");
        }
    }

    private async doesStateExist(stateName: string): Promise<boolean> {
        return await this.stateModel.exists({ stateName });
    }
}
