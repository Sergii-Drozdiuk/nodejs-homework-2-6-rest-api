import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import { validateBody } from '../../decorators/index.js';
import {
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
} from '../../middlewares/index.js';
import {
  contactPostSchema,
  contactPutSchema,
  contactPatchSchema,
} from '../../models/Contact.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.get);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(contactPostSchema),
  contactsController.add
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactPutSchema),
  contactsController.updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactPatchSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

export default contactsRouter;
