import { Injectable } from '@nestjs/common';
import {
  CreateNotificationProvider,
  CreateNotificationInput,
} from './providers/create-notification.provider';
import { FindNotificationsProvider } from './providers/find-notifications.provider';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly createNotificationProvider: CreateNotificationProvider,
    private readonly findNotificationsProvider: FindNotificationsProvider,
  ) {}

  /**
   * Creates a new in-app notification for a user.
   * @param input - Notification payload including userId, type, title, and message
   */
  create(input: CreateNotificationInput) {
    return this.createNotificationProvider.create(input);
  }

  /**
   * Retrieves paginated notifications for the specified user.
   * @param userId - ID of the user whose notifications to retrieve
   * @param query - Pagination and filter options
   */
  findAll(userId: string, query: NotificationQueryDto) {
    return this.findNotificationsProvider.findAll(userId, query);
  }

  /**
   * Marks a single notification as read.
   * Ownership is enforced — users can only mark their own notifications.
   * @param notificationId - UUID of the notification
   * @param userId - ID of the requesting user
   */
  markRead(notificationId: string, userId: string) {
    return this.findNotificationsProvider.markRead(notificationId, userId);
  }

  /**
   * Marks all notifications for the given user as read.
   * @param userId - ID of the user
   */
  markAllRead(userId: string) {
    return this.findNotificationsProvider.markAllRead(userId);
  }
}
