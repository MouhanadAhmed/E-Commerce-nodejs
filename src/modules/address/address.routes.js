
import express from 'express';
import * as addressControllers from './address.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { protectedRoutes } from '../auth/auth.controller.js';
import { addAddressSchema, deleteAddressSchema, getAddressByIdSchema } from './address.validator.js';
const addressRouter =  express.Router();



addressRouter.route('/')
        .patch(protectedRoutes,validation(addAddressSchema),addressControllers.addAddress)
        .delete(protectedRoutes,validation(deleteAddressSchema),addressControllers.removeAddress)
        .get(protectedRoutes,addressControllers.getAllAddresses)

addressRouter.route('/:id').get(protectedRoutes,validation(getAddressByIdSchema),addressControllers.getSpecificAddress)

export default addressRouter;