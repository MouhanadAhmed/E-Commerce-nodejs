import {subCategoryModel} from '../../../Database/models/subCategory.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';


/**
 * This is Add subCategory Controller, 
 */
export const addSubCategory = addOne(subCategoryModel,'subCategory');
/**
 * This is Get All subCategory Controller
 */
export const getAllSubCategories = getAll(subCategoryModel, 'SubCategories');
/**
 * This is Update subCategory Controller
 */
export const updateSubCategory = updateOne(subCategoryModel, 'subCategory')
/**
 * This is Delete subCategory Controller 
 */
export const deleteSubCategory = deleteOne(subCategoryModel, 'subCategory');


/**
 * This is Get Category by Id Controller
 */
export const getSubCategotryById = getById(subCategoryModel, 'subCategory');