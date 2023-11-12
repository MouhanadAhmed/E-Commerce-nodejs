import {categoryModel} from '../../../Database/models/category.model.js';
import { deleteOne, addOne, getAll, updateOne, getById  } from '../../utils/handlers/refactor.handler.js';

/**
 * This is Add Category Controller
 */
export const addCategory = addOne(categoryModel, 'Category');
/**
 * This is Get All Category Controller
 */
export const getAllCategories = getAll(categoryModel, 'Categories');
/**
 * This is Update Category Controller
 */
export const updateCategory = updateOne(categoryModel, 'Category');
/**
 * This is Delete Category Controller
 */
export const deleteCategory = deleteOne(categoryModel, 'Category');

/**
 * This is Get Category by Id Controller
 */
export const getCategotryById = getById(categoryModel, 'Category');