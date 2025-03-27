import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false })
export class Passage extends Document {
  @Prop({ type: Number, required: true })
  passage_id: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  passage: string;

  @Prop({ type: Object, default: {} })
  questions: {
    true_false_not_given?: any[];
    multiple_choice?: any[];
    complete_the_notes?: any;
    table_completion?: any;
    short_answer?: any;
    matching_information_to_paragraphs?: any[];
    yes_no_not_given?: any[];
    list_selection?: any;
    summary_completion?: any;
    short_answer_questions?: any[];
    list_of_headings?: any;
    sentence_completion?: any;
  };
}

export const ReadingSchema = SchemaFactory.createForClass(Passage);
