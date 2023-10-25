import {productModel} from '../../../Database/models/product.model.js';
import { deleteOne, addOne, getAll, updateOne, getById  } from '../../utils/handlers/refactor.handler.js';

/**
 * *This is Add product Controller, 
 * todo: Global error handeling
 */
export const addProduct = addOne(productModel, 'Product');
/**
 * *This is Get All product Controller, 
 * todo: Global error handeling
 */
export const getAllProducts = getAll(productModel, 'Products');
/**
 * *This is Update product Controller, 
 * todo: Global error handeling
 */
export const updateProduct = updateOne(productModel, 'Product');
/**
 * *This is Delete product Controller, 
 * todo: Global error handeling
 */
export const deleteProduct = deleteOne(productModel, 'Product');

/**
 * *This is Get product by Id Controller, 
 * todo: Global error handeling
 */
export const getProductById = getById(productModel, 'Product');