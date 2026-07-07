/** Payment lifecycle status of an invoice. */
export type InvoiceStatus = "PENDING" | "PAID" | "CANCELLED";

/** Single billable line on an invoice. */
export interface LineItem {
  description: string;
  startDate?: string;
  endDate?: string;
  seatCount?: number;
  amountKobo: number;
  amountNaira: number;
}

/** Invoice issued to a user for a booking payment. */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  bookingId: string;
  paymentId?: string;
  amountKobo: number;
  currency: string;
  status: InvoiceStatus;
  paidAt?: string;
  lineItems?: LineItem[];
  createdAt: string;
  updatedAt: string;
}
