import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileControllers from '../controllers/ProfileControlles';

const profileRouter = Router();

const profileControllers = new ProfileControllers();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
}), profileControllers.update);

profileRouter.get('/', profileControllers.show);



export default profileRouter;
