import { Controller, Get, Param } from '@nestjs/common';
import { ReadingService } from './reading.service';

@Controller('api') // Define the base route for this controller
export class ReadingController {
  constructor(private readonly ReadingService: ReadingService) {}

  @Get('/reading/:selected_option')
  async getPassage1(
    @Param('selected_option') selected_option: string,
  ): Promise<any> {
    const result = await this.ReadingService.getPassage1Data(selected_option);
    return { result };
  }
}
