/** Categories of notifications dispatched to platform users. */
export type NotificationType =
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "GENERAL";

/** In-app notification record displayed to a user. */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
