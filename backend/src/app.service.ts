import { Injectable } from '@nestjs/common';

/**
 * Root application service for the NovaLabs backend.
 * Provides basic health-check utilities used by the AppController.
 */
@Injectable()
export class AppService {
  /**
   * Returns a simple greeting string. Used by the root GET endpoint.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
