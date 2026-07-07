import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Payload required to initialize a payment for an existing booking.
 */
export class InitializePaymentDto {
  @ApiProperty({ description: 'The booking ID to pay for' })
  @IsUUID()
  bookingId: string;
}
