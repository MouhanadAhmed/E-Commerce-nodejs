
import express from 'express';
import * as categoryControllers from './category.controller.js';
const categoryRouter =  express.Router();
import { uploadSingleFile } from '../../utils/multer.js';
import { uploadSingleFileCloud } from '../../utils/multerCloud.js';
import subCategoryRouter from '../subCategory/subCategory.routes.js';
import { validation } from '../../utils/middleware/validation.js';
import { createCategorySchema, deleteCategorySchema, getCategoryByIdSchema, updateCategorySchema } from './category.validator.js';

categoryRouter.use('/:id/subCategory',subCategoryRouter);

categoryRouter.route('/')
        .post(uploadSingleFileCloud('image'),validation(createCategorySchema),categoryControllers.addCategory)
        .get(categoryControllers.getAllCategories)


categoryRouter.route('/:id')
        .get(validation(getCategoryByIdSchema),categoryControllers.getCategotryById)
        .put(validation(updateCategorySchema),categoryControllers.updateCategory)
        .delete(validation(deleteCategorySchema),categoryControllers.deleteCategory)


export default categoryRouter;