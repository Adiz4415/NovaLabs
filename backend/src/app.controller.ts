import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

/**
 * Root application controller for NovaLabs backend.
 * Exposes the root health-check and greeting endpoints.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Returns a simple greeting. Public endpoint. */
  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Health-check endpoint. Returns server status and current timestamp.
   * Used by load balancers and uptime monitors.
   */
  @Public()
  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'Server is running',
      Timestamp: Date.now(),
    };
  }
}
