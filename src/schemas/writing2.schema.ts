import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'writing_2', strict: false })
export class WritingTask_2 extends Document {
  @Prop({ type: String, required: true })
  task_type: string;

  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: [String], required: false })
  topics?: string[];
}

export const WritingTask_2Schema = SchemaFactory.createForClass(WritingTask_2);
