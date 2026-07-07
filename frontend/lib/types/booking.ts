/** Lifecycle status of a workspace booking. */
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

/** Billing interval options available when creating a booking. */
export type PlanType =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY";

/** Represents a workspace reservation made by a user. */
export interface Booking {
  id: string;
  userId: string;
  workspaceId: string;
  planType: PlanType;
  startDate: string;
  endDate: string;
  totalAmount: number; // in kobo
  status: BookingStatus;
  seatCount: number;
  notes?: string;
  sorobanEscrowId?: string;
  createdAt: string;
  updatedAt: string;
  workspace?: {
    id: string;
    name: string;
    type: string;
  };
}

/** Payload required to create a new booking. */
export interface CreateBookingDto {
  workspaceId: string;
  planType: PlanType;
  startDate: string;
  endDate: string;
  seatCount: number;
  notes?: string;
}

/** Pre-checkout price calculation returned for a prospective booking. */
export interface PriceEstimate {
  totalAmount: number; // kobo
  totalAmountNaira: number;
  planType: PlanType;
  seatCount: number;
  startDate: string;
  endDate: string;
}
