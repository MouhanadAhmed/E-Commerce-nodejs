import {brandModel} from '../../../Database/models/brand.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';


/**
 * *This is Add brand Controller, 
 * todo: Global error handeling
 */
export const addBrand = addOne(brandModel,"brand");
/**
 * *This is Get All Brands Controller, 
 * todo: Global error handeling
 */
export const getAllBrands = getAll(brandModel,"brands");
/**
 * *This is Update Brand Controller, 
 * todo: Global error handeling
 */
export const updateBrand = updateOne(brandModel,"brand");
/**
 * *This is Delete Brand Controller, 
 * todo: Global error handeling
 */
export const deleteBrand = deleteOne(brandModel,"brand");

/**
 * *This is Get Category by Id Controller, 
 * todo: Global error handeling
 */
export const getBrandById = getById(brandModel, 'brand');