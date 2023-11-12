import {brandModel} from '../../../Database/models/brand.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';


/**
 * This is Add brand Controller
 */
export const addBrand = addOne(brandModel,"brand");
/**
 * This is Get All Brands Controller
 */
export const getAllBrands = getAll(brandModel,"brands");
/**
 * This is Update Brand Controller
 */
export const updateBrand = updateOne(brandModel,"brand");
/**
 * This is Delete Brand Controller
 */
export const deleteBrand = deleteOne(brandModel,"brand");

/**
 * This is Get Category by Id Controller
 */
export const getBrandById = getById(brandModel, 'brand');