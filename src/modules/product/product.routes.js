
import express from 'express';
import * as productControllers from './product.controller.js';
const productRouter =  express.Router();
import { uploadMixFiles } from '../../utils/middleware/fileUploads.js';
import {validation} from '../../utils/middleware/validation.js';
import { createProductSchema, deleteProductSchema, getProductByIdSchema, updateProductSchema } from './product.validator.js';



productRouter.route('/')
        .post(uploadMixFiles("product",[{name:"imgCover",maxCount:1},{name:"images",maxCount:8}]),validation(createProductSchema),productControllers.addProduct)
        .get(productControllers.getAllProducts)


productRouter.route('/:id')
        .get(validation(getProductByIdSchema),productControllers.getProductById)
        .put(validation(updateProductSchema),productControllers.updateProduct)
        .delete(validation(deleteProductSchema),productControllers.deleteProduct)
export default productRouter;