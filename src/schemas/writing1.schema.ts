import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'writing_1', strict: false })
export class WritingTask_1 extends Document {
  @Prop({ type: String, required: true })
  task_type: string;

  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String, required: true })
  graph_type: string;

  @Prop({ type: String, required: true })
  graph_image_url: string;
}

export const WritingTask_1Schema = SchemaFactory.createForClass(WritingTask_1);
