
import express from 'express';
import * as brandControllers from './brand.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { createBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from './brand.validator.js';
const brandRouter =  express.Router();

brandRouter.route('/')
        .post(validation(createBrandSchema),brandControllers.addBrand)
        .get(brandControllers.getAllBrands)


brandRouter.route('/:id')
        .get(validation(getBrandByIdSchema),brandControllers.getBrandById)
        .put(validation(updateBrandSchema),brandControllers.updateBrand)
        .delete(validation(deleteBrandSchema),brandControllers.deleteBrand)
export default brandRouter;