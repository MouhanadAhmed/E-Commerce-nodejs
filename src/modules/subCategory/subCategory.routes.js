
import express from 'express';
import * as subCategoryControllers from './subCategory.controller.js';
const subCategoryRouter =  express.Router({mergeParams:true});
import { uploadSingleFileCloud } from '../../utils/multerCloud.js';
import {validation} from '../../utils/middleware/validation.js';
import { createSubCategorySchema, deleteSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from './subCategory.validator.js';
subCategoryRouter.route('/')
        .post(uploadSingleFileCloud('image'),validation(createSubCategorySchema),subCategoryControllers.addSubCategory)
        .get(subCategoryControllers.getAllSubCategories)


subCategoryRouter.route('/:id')
        .get(validation(getSubCategoryByIdSchema),subCategoryControllers.getSubCategotryById) 
        .put(validation(updateSubCategorySchema),subCategoryControllers.updateSubCategory)
        .delete(validation(deleteSubCategorySchema),subCategoryControllers.deleteSubCategory)
export default subCategoryRouter;