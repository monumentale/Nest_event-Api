import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateSchema } from './state.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "StateSchema",
        schema: StateSchema
      }
    ])
  ],
  providers: [StateService],
  controllers: [StateController],
  exports: [StateService]
})
export class StateModule {}
