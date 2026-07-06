import { Injectable } from '@nestjs/common';
import { GenerateInvoiceProvider } from './providers/generate-invoice.provider';
import { FindInvoicesProvider } from './providers/find-invoices.provider';
import { PdfInvoiceProvider } from './providers/pdf-invoice.provider';
import { InvoiceQueryDto } from './dto/invoice-query.dto';
import { UserRole } from '../users/enums/userRoles.enum';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly generateInvoiceProvider: GenerateInvoiceProvider,
    private readonly findInvoicesProvider: FindInvoicesProvider,
    private readonly pdfInvoiceProvider: PdfInvoiceProvider,
  ) {}

  /**
   * Generates an invoice for a completed payment.
   * @param paymentId - UUID of the payment to invoice
   */
  generateForPayment(paymentId: string) {
    return this.generateInvoiceProvider.generateForPayment(paymentId);
  }

  /**
   * Lists invoices with pagination. Users see their own; admins see all.
   * @param query - Filter/pagination options
   * @param userId - Requesting user ID
   * @param userRole - Requesting user role
   */
  findAll(query: InvoiceQueryDto, userId: string, userRole: UserRole) {
    return this.findInvoicesProvider.findAll(query, userId, userRole);
  }

  /**
   * Retrieves a single invoice by ID with ownership enforcement.
   * @param invoiceId - UUID of the invoice
   * @param userId - Requesting user ID
   * @param userRole - Requesting user role
   */
  findById(invoiceId: string, userId: string, userRole: UserRole) {
    return this.findInvoicesProvider.findById(invoiceId, userId, userRole);
  }

  /**
   * Generates a PDF buffer for the specified invoice.
   * @param invoiceId - UUID of the invoice
   * @param userId - Requesting user ID
   * @param userRole - Requesting user role
   * @returns PDF buffer and invoice number for the download response
   */
  async downloadPdf(
    invoiceId: string,
    userId: string,
    userRole: UserRole,
  ): Promise<{ pdf: Buffer; invoiceNumber: string }> {
    const invoice = await this.findInvoicesProvider.findById(
      invoiceId,
      userId,
      userRole,
    );
    const pdf = await this.pdfInvoiceProvider.generate(invoice);
    return { pdf, invoiceNumber: invoice.invoiceNumber };
  }
}
