import { HttpException, InternalServerErrorException } from '@nestjs/common';

/**
 * Utility function for uniform error handling across service providers.
 * Re-throws NestJS HttpExceptions as-is so their status codes and messages are preserved.
 * Wraps all other unexpected errors in an InternalServerErrorException with a descriptive message.
 *
 * @param error - The caught error
 * @param message - Context label prepended to the 500 error message (e.g. 'CreateBooking')
 * @throws HttpException | InternalServerErrorException
 */
export function ErrorCatch(error: any, message: string): never {
  if (error instanceof HttpException) {
    throw error;
  }

  throw new InternalServerErrorException(`${message}: Internal server error`);
}
