import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
  ) {}
  
  @Get('health-check')
  async getHealthCheck() {    
    return {
      build_number: process.env.BUILD_NUMBER,
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
