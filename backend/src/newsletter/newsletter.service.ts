import { Injectable } from '@nestjs/common';
import { NewsletterProvider } from './providers/subscription.provider';
import { PaginationQueryDto } from '../config/pagination/dto/pagination-query.dto';
import { ListNewsletterSubscribersProvider } from './providers/list-subscribers.provider';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly subscriptionProvider: NewsletterProvider,
    private readonly listSubscribersProvider: ListNewsletterSubscribersProvider,
  ) {}

  /**
   * Subscribes an email address to the NovaLabs newsletter.
   * Sends a confirmation email with a verification link.
   * @param email - The email address to subscribe
   * @param ipAddress - Optional IP address for rate-limit tracking
   */
  subscribe(email: string, ipAddress?: string | null) {
    return this.subscriptionProvider.subscribe({ email, ipAddress });
  }

  /**
   * Unsubscribes an email address using the unsubscribe token from the email link.
   * @param token - Unsubscribe token
   */
  unsubscribe(token: string) {
    return this.subscriptionProvider.unsubscribe({ token });
  }

  /**
   * Confirms a newsletter subscription using the token sent in the confirmation email.
   * @param token - Confirmation token
   */
  confirm(token: string) {
    return this.subscriptionProvider.confirm({ token });
  }

  /**
   * Lists all newsletter subscribers. Restricted to Admin role.
   * @param query - Pagination options
   */
  listSubscribers(query: PaginationQueryDto) {
    return this.listSubscribersProvider.execute(query);
  }
}
