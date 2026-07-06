import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreatePublicBookingDto } from './dto/create-public-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';
import { CreateBookingProvider } from './providers/create-booking.provider';
import { CreatePublicDayPassProvider } from './providers/create-public-day-pass.provider';
import { ConfirmBookingProvider } from './providers/confirm-booking.provider';
import { CancelBookingProvider } from './providers/cancel-booking.provider';
import { CompleteBookingProvider } from './providers/complete-booking.provider';
import { FindBookingsProvider } from './providers/find-bookings.provider';
import { UserRole } from '../users/enums/userRoles.enum';
import { Booking } from './entities/booking.entity';
import { PricingService } from './pricing/pricing.service';
import { PlanType } from './enums/plan-type.enum';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBookingProvider: CreateBookingProvider,
    private readonly createPublicDayPassProvider: CreatePublicDayPassProvider,
    private readonly confirmBookingProvider: ConfirmBookingProvider,
    private readonly cancelBookingProvider: CancelBookingProvider,
    private readonly completeBookingProvider: CompleteBookingProvider,
    private readonly findBookingsProvider: FindBookingsProvider,
    private readonly pricingService: PricingService,
  ) {}

  /**
   * Creates a new booking for an authenticated user.
   * @param dto - Booking creation payload
   * @param userId - ID of the authenticated user making the booking
   */
  create(dto: CreateBookingDto, userId: string) {
    return this.createBookingProvider.create(dto, userId);
  }

  /**
   * Creates a public day-pass booking without requiring authentication.
   * @param dto - Public day-pass booking payload
   */
  publicDayPass(dto: CreatePublicBookingDto) {
    return this.createPublicDayPassProvider.create(dto);
  }

  /**
   * Confirms a pending booking. Restricted to Admin/Staff.
   * @param bookingId - UUID of the booking to confirm
   */
  confirm(bookingId: string): Promise<Booking> {
    return this.confirmBookingProvider.confirm(bookingId);
  }

  /**
   * Cancels an existing booking.
   * Regular users can only cancel their own bookings; admins can cancel any.
   * @param bookingId - UUID of the booking to cancel
   * @param userId - ID of the requesting user
   * @param userRole - Role of the requesting user
   */
  cancel(bookingId: string, userId: string, userRole: UserRole) {
    return this.cancelBookingProvider.cancel(bookingId, userId, userRole);
  }

  /**
   * Marks a booking as completed. Restricted to Admin/Staff.
   * @param bookingId - UUID of the booking to complete
   */
  complete(bookingId: string) {
    return this.completeBookingProvider.complete(bookingId);
  }

  findAll(query: BookingQueryDto, userId: string, userRole: UserRole) {
    return this.findBookingsProvider.findAll(query, userId, userRole);
  }

  findById(bookingId: string, userId: string, userRole: UserRole) {
    return this.findBookingsProvider.findById(bookingId, userId, userRole);
  }

  calculatePrice(
    hourlyRateKobo: number,
    planType: PlanType,
    seatCount: number,
    startDate: string,
    endDate: string,
  ) {
    return this.pricingService.calculateAmount(
      hourlyRateKobo,
      planType,
      seatCount,
      startDate,
      endDate,
    );
  }

  getPlanSummary(planType: PlanType) {
    return this.pricingService.getPlanSummary(planType);
  }
}
