import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsControllers';
import ProviderAppointmentsControllers from '../controllers/ProviderAppointmentsControllers';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

const appointmentsControllers = new AppointmentsController();
const providerAppointmentsControllers = new ProviderAppointmentsControllers();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
}), appointmentsControllers.create);

appointmentsRouter.get('/me', providerAppointmentsControllers.index);

export default appointmentsRouter;
