import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Passage, ReadingSchema } from 'src/schemas/reading.schema';

@Injectable()
export class ReadingService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  // Dynamically get the model for a specific passage collection
  private getPassageModel(passage_id: number): mongoose.Model<Passage> {
    const collectionName = `passage_${passage_id}`;
    const modelName = `${collectionName}Model`;
    console.log(`Getting model for collection: ${collectionName}`);
    return this.connection.model<Passage>(
      modelName, //this is actually the model name
      ReadingSchema, //schema name
      collectionName, //overrides the default pluralization behavior, and Mongoose uses your exact collection name
    );
  }

  // Fetch passage from a given collection based on dynamic selected_option field
  private async getPassageFromCollection(
    model: mongoose.Model<Passage>,
    selected_option: string,
  ): Promise<Passage | null> {
    // Query with dynamic field search inside 'questions'
    const passage = await model
      .aggregate([
        {
          $match: {
            [`questions.${selected_option}`]: { $exists: true }, // Dynamically check for the field inside 'questions'
          },
        },
        { $sample: { size: 1 } }, // Randomly select one document
        {
          $project: {
            _id: 1,
            Passage_id: 1,
            title: 1,
            passage: 1,
            [`questions.${selected_option}`]: 1, // Include the selected_option field
          },
        },
      ])
      .exec();

    console.log('Found passage:', passage); // Log the result to see what is returned
    return passage.length > 0 ? passage[0] : null; // Return the first matching passage, or null if not found
  }

  // Fetch the selected_option passage from passage_1, passage_2, and passage_3
  async getPassage1Data(selected_option: string): Promise<Passage | null> {
    const passage1Model = this.getPassageModel(1);
    const passage2Model = this.getPassageModel(2);
    const passage3Model = this.getPassageModel(3);

    // Search for the selected_option in each of the three collections
    const [passage1, passage2, passage3] = await Promise.all([
      this.getPassageFromCollection(passage1Model, selected_option),
      this.getPassageFromCollection(passage2Model, selected_option),
      this.getPassageFromCollection(passage3Model, selected_option),
    ]);

    // Filter out null values (in case no matching data is found)
    const passages = [passage1, passage2, passage3].filter((p) => p !== null);

    if (passages.length === 0) {
      console.log('No matching passages found.');
      return null; // No matching data in any collection
    }

    // Now, let's randomly choose one passage from the found ones
    const finalRandomPassage =
      passages[Math.floor(Math.random() * passages.length)];
    console.log('Randomly selected passage:', finalRandomPassage);
    return finalRandomPassage;
  }
}
