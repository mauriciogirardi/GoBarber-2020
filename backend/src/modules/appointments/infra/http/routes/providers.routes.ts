import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProvidersControllers from '../controllers/ProvidersControllers';
import ProviderMonthAvailabilityControllers from '../controllers/ProviderMonthAvailabilityControllers';
import ProviderDayAvailabilityControllers from '../controllers/ProviderDayAvailabilityControllers';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();

const providersControlles = new ProvidersControllers();
const providerMonthAvailabilityControllers = new ProviderMonthAvailabilityControllers();
const providerDayAvailabilityControllers = new ProviderDayAvailabilityControllers();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersControlles.index);

providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}), providerMonthAvailabilityControllers.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}), providerDayAvailabilityControllers.index);

export default providersRouter;

