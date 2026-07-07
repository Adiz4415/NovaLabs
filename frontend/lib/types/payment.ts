/** Current status of a payment transaction. */
export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

/** Payment service providers supported by the platform. */
export type PaymentProvider = "paystack" | "soroban";

/** Payment transaction tied to a booking and a user. */
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number; // kobo
  currency: string;
  provider: PaymentProvider;
  providerReference?: string;
  status: PaymentStatus;
  paidAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  booking?: {
    id: string;
  };
}

/** Response returned by the payments API after initializing a transaction. */
export interface InitializePaymentResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  paymentId: string;
}
