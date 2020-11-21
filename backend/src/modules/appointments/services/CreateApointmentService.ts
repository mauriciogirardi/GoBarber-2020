import { injectable, inject } from 'tsyringe';
import { format, getHours, isBefore, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Apointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You cant't create an appontiment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You cant't create an appontiment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You cant't create an appontiment before at 8am and after at 5pm");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
