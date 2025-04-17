import { Controller, Get } from '@nestjs/common';
import { WritingService } from './writing.service';

@Controller('api')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Get('/writing/part1')
  async getWriting(): Promise<any> {
    const result = await this.writingService.getWriting1Data();
    return { result };
  }

  @Get('/writing/part2')
  async getWriting2(): Promise<any> {
    const result = await this.writingService.getWriting2Data();
    return { result };
  }
}
