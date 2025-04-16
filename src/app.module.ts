import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingModule } from './reading/reading.module';
import { WritingModule } from './writing/writing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = await Promise.resolve(
          configService.get<string>('MONGODB_URI', { infer: true }),
        );
        if (!uri) {
          throw new Error('MONGODB_URI is not defined');
        }
        console.log('MongoDB URI:', uri);

        return { uri };
      },
      inject: [ConfigService],
    }),
    ReadingModule,
    WritingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
