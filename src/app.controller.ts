import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './dtos/app.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  async getHello(@Body() body: AppDto) {
    const response = await this.appService.getHello(body);
    return {
      message: response,
    };
  }

  @Get()
  async getHelloWorld() {
    return 'Hello World!';
  }
}
