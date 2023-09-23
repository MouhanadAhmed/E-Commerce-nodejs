
import express from 'express';
import * as brandControllers from './brand.controller.js';
const brandRouter =  express.Router();

brandRouter.route('/')
        .post(brandControllers.addBrand)
        .get(brandControllers.getAllBrands)


brandRouter.route('/:id')
        .get(brandControllers.getBrandById)
        .put(brandControllers.updateBrand)
        .delete(brandControllers.deleteBrand)
export default brandRouter;