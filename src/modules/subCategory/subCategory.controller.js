import {subCategoryModel} from '../../../Database/models/subCategory.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../handlers/factor.js';


/**
 * This is Add subCategory Controller, 
 * todo: Global error handeling
 */
export const addSubCategory = addOne(subCategoryModel,'subCategory');
/**
 * *This is Get All subCategory Controller, 
 * todo: Global error handeling
 */
export const getAllSubCategories = getAll(subCategoryModel, 'SubCategories');
/**
 * *This is Update subCategory Controller, 
 * todo: Global error handeling
 */
export const updateSubCategory = updateOne(subCategoryModel, 'subCategory')
/**
 * *This is Delete subCategory Controller, 
 * todo: Global error handeling
 */
export const deleteSubCategory = deleteOne(subCategoryModel, 'subCategory');


/**
 * *This is Get Category by Id Controller, 
 * todo: Global error handeling
 */
export const getSubCategotryById = getById(subCategoryModel, 'subCategory');