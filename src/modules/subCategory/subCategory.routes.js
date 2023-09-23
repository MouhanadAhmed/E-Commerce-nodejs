
import express from 'express';
import * as subCategoryControllers from './subCategory.controller.js';
const subCategoryRouter =  express.Router({mergeParams:true});
import { uploadSingleFileCloud } from '../../utils/multerCloud.js';
subCategoryRouter.route('/')
        .post(uploadSingleFileCloud('image'),subCategoryControllers.addSubCategory)
        .get(subCategoryControllers.getAllSubCategories)


subCategoryRouter.route('/:id')
        .get(subCategoryControllers.getSubCategotryById) 
        .put(subCategoryControllers.updateSubCategory)
        .delete(subCategoryControllers.deleteSubCategory)
export default subCategoryRouter;