import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SeesionsControllers from '../controllers/SessionsControllers';

const sessionsRouter = Router();

const sessionsControllers = new SeesionsControllers();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), sessionsControllers.create);

export default sessionsRouter;
