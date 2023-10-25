import {categoryModel} from '../../../Database/models/category.model.js';
import { deleteOne, addOne, getAll, updateOne, getById  } from '../../utils/handlers/refactor.handler.js';

/**
 * *This is Add Category Controller, 
 * todo: Global error handeling
 */
export const addCategory = addOne(categoryModel, 'Category');
/**
 * *This is Get All Category Controller, 
 * todo: Global error handeling
 */
export const getAllCategories = getAll(categoryModel, 'Categories');
/**
 * *This is Update Category Controller, 
 * todo: Global error handeling
 */
export const updateCategory = updateOne(categoryModel, 'Category');
/**
 * *This is Delete Category Controller, 
 * todo: Global error handeling
 */
export const deleteCategory = deleteOne(categoryModel, 'Category');

/**
 * *This is Get Category by Id Controller, 
 * todo: Global error handeling
 */
export const getCategotryById = getById(categoryModel, 'Category');