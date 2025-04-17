import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WritingTask_1 } from 'src/schemas/writing1.schema';
import { WritingTask_2 } from 'src/schemas/writing2.schema';

@Injectable()
export class WritingService {
  constructor(
    @InjectModel(WritingTask_1.name)
    private writingTask_1Model: Model<WritingTask_1>,
    @InjectModel(WritingTask_2.name)
    private writingTask_2Model: Model<WritingTask_2>,
  ) {}

  async getWriting1Data(): Promise<WritingTask_1 | null> {
    try {
      const result = await this.writingTask_1Model.aggregate([
        { $sample: { size: 1 } },
      ]);
      return result[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch random writing task: ${error.message}`);
    }
  }

  async getWriting2Data(): Promise<WritingTask_2 | null> {
    try {
      const result = await this.writingTask_2Model.aggregate([
        { $sample: { size: 1 } },
      ]);
      return result[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch random writing task: ${error.message}`);
    }
  }
}
