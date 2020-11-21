import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import { getMongoRepository, MongoRepository } from "typeorm";

import INotificationRepository from "@modules/notifications/repositories/INotificationRepository";
import Notification from '../schemas/Notification'


class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notifications = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notifications);

    return notifications;
  }
}

export default NotificationsRepository;
