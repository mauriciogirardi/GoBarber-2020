import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower, FiUser, FiSettings } from 'react-icons/fi';
import { isToday, format, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import api from 'services/api';

import { useAuth } from 'hooks/auth';
import logoImg from 'assets/logo.svg';

import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  ImageFakeProfile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
  ImageFakeAppointment,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentData {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar: string;
  };
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(
    () => format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr }),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(() => {
    const formatDayOfWeek =
      format(selectedDate, 'cccc') === 'Sunday' ||
      format(selectedDate, 'cccc') === 'Saturday'
        ? 'cccc'
        : "cccc'-feira'";

    return format(selectedDate, formatDayOfWeek, { locale: ptBr });
  }, [selectedDate]);

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => parseISO(appointment.date).getHours() < 12,
      ),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => parseISO(appointment.date).getHours() >= 12,
      ),
    [appointments],
  );

  const nextAppointments = useMemo(
    () =>
      appointments.find(appointment =>
        isAfter(parseISO(appointment.date), new Date()),
      ),
    [appointments],
  );

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<AppointmentData[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentFormatted = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(appointmentFormatted);
      });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <ImageFakeProfile>
                <FiUser />
              </ImageFakeProfile>
            )}
            <div>
              <span>Bem vindo!</span>
              <Link to="/profile" title="perfil do usuário">
                <strong>{user.name}</strong>
                <FiSettings />
              </Link>
            </div>
          </Profile>

          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointments && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                {nextAppointments.user.avatar ? (
                  <img
                    src={nextAppointments.user.avatar}
                    alt={nextAppointments.user.name}
                  />
                ) : (
                  <ImageFakeProfile>
                    <FiUser />
                  </ImageFakeProfile>
                )}
                <strong>{nextAppointments.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointments.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento no período da manhã</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  {appointment.user.avatar ? (
                    <img
                      src={appointment.user.avatar}
                      alt={appointment.user.name}
                    />
                  ) : (
                    <ImageFakeAppointment>
                      <FiUser />
                    </ImageFakeAppointment>
                  )}
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento no período da tarde</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  {appointment.user.avatar ? (
                    <img
                      src={appointment.user.avatar}
                      alt={appointment.user.name}
                    />
                  ) : (
                    <ImageFakeAppointment>
                      <FiUser />
                    </ImageFakeAppointment>
                  )}
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[...disabledDays]}
            modifiers={{ available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
