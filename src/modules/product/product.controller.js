import {productModel} from '../../../Database/models/product.model.js';
import { deleteOne, addOne, getAll, updateOne, getById  } from '../../utils/handlers/refactor.handler.js';

/**
 * This is Add product Controller
 */
export const addProduct = addOne(productModel, 'Product');
/**
 * This is Get All product Controller
 */
export const getAllProducts = getAll(productModel, 'Products');
/**
 * This is Update product Controller
 */
export const updateProduct = updateOne(productModel, 'Product');
/**
 * This is Delete product Controller
 */
export const deleteProduct = deleteOne(productModel, 'Product');

/**
 * This is Get product by Id Controller
 */
export const getProductById = getById(productModel, 'Product');