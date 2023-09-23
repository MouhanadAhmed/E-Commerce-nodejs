
import express from 'express';
import * as categoryControllers from './category.controller.js';
const categoryRouter =  express.Router();
import { uploadSingleFile } from '../../utils/multer.js';
import { uploadSingleFileCloud } from '../../utils/multerCloud.js';
import subCategoryRouter from '../subCategory/subCategory.routes.js';

categoryRouter.use('/:id/subCategory',subCategoryRouter);
categoryRouter.route('/')
        .post(uploadSingleFileCloud('image'),categoryControllers.addCategory)
        .get(categoryControllers.getAllCategories)


categoryRouter.route('/:id')
        .get(categoryControllers.getCategotryById)
        .put(categoryControllers.updateCategory)
        .delete(categoryControllers.deleteCategory)
export default categoryRouter;