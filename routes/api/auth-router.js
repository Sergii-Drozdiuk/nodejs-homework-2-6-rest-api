import express from 'express';
import authController from '../../controllers/auth-controller.js';
import { isEmptyBody, authenticate, upload } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionSchema,
} from '../../models/User.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.register
);

authRouter.post(
  '/login',
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.login
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.patch(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authController.subscription
);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  authController.updateAvatar
);

export default authRouter;
