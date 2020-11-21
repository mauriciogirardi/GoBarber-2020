import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordControllers from '../controllers/ForgotPasswordControllers';
import ResetForgotPasswordControllers from '../controllers/ResetForgotPasswordControllers';

const passwordRouter = Router();

const passwordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetForgotPasswordControllers();

passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  }
}), passwordControllers.create);

passwordRouter.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  }
}), resetPasswordControllers.create);

export default passwordRouter;
