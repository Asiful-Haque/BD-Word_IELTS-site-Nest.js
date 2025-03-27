import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { Passage, ReadingSchema } from 'src/schemas/reading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Passage.name, schema: ReadingSchema }]),
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
