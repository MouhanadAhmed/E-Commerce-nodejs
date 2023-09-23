
import express from 'express';
import * as productControllers from './product.controller.js';
const productRouter =  express.Router();
import { uploadSingleFile } from '../../utils/multer.js';
import { uploadSingleFileCloud } from '../../utils/multerCloud.js';
// import subproductRouter from '../subproduct/subproduct.routes.js';

// productRouter.use('/:id/subproduct',subproductRouter);
productRouter.route('/')
        .post(uploadSingleFileCloud('image'),productControllers.addProduct)
        .get(productControllers.getAllProducts)


productRouter.route('/:id')
        .get(productControllers.getProductById)
        .put(productControllers.updateProduct)
        .delete(productControllers.deleteProduct)
export default productRouter;