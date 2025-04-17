import { Module } from '@nestjs/common';
import { WritingController } from './writing.controller';
import { WritingService } from './writing.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WritingTask_1,
  WritingTask_1Schema,
} from 'src/schemas/writing1.schema';
import {
  WritingTask_2,
  WritingTask_2Schema,
} from 'src/schemas/writing2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WritingTask_1.name, schema: WritingTask_1Schema },
      { name: WritingTask_2.name, schema: WritingTask_2Schema },
    ]),
  ],
  controllers: [WritingController],
  providers: [WritingService],
})
export class WritingModule {}
