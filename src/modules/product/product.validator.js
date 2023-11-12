import Joi from "joi";

/**
 * This is Create Product validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars     ------------> required
 * - price (Number) : minimum value 0  --------------------------------> required
 * - priceAfterDiscount (Number) : minimum value 0 
 * - description (String) : minimum 10 chars, maximum 100 chars    ---> required
 * - quantity (Number) : minimum value 0  ----------------------------> required
 * - sold (Number) : minimum value 0 
 * - category (String) : length 24 numbers , hex-----------------------> required
 * - subCategory (String) : length 24 numbers , hex  ------------------> required
 * - brand (String) : length 24 numbers , hex--------------------------> required
 * - ratingAverage (Number) : minimum value 1 
 * - ratingCount (Number) : minimum value 0 
 */
export const createProductSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    price:Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0).optional(),
    description:Joi.string().min(10).max(100).required(),
    quantity:Joi.number().min(0).required(),
    sold:Joi.number().min(0).optional(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    ratingAverage:Joi.number().min(1).optional(),
    ratingCount:Joi.number().min(0).optional(),
})
/**
 * This is Update Product validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars           ---> required
 * - id (String) : length 24 numbers , hex     ---------------------> required
 * - price (Number) : minimum value 0 
 * - priceAfterDiscount (Number) : minimum value 0 
 * - description (String) : minimum 10 chars, maximum 100 chars
 * - quantity (Number) : minimum value 0
 * - sold (Number) : minimum value 0 
 * - category (String) : length 24 numbers , hex 
 * - subCategory (String) : length 24 numbers , hex
 * - brand (String) : length 24 numbers , hex
 * - ratingAverage (Number) : minimum value 1 
 * - ratingCount (Number) : minimum value 0 
 */
export const updateProductSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id: Joi.string().hex().length(24).required(),
    price:Joi.number().min(0).optional(),
    priceAfterDiscount:Joi.number().min(0).optional(),
    description:Joi.string().min(10).max(100).optional(),
    quantity:Joi.number().min(0).optional(),
    sold:Joi.number().min(0).optional(),
    category:Joi.string().hex().length(24).optional(),
    subCategory:Joi.string().hex().length(24).optional(),
    brand:Joi.string().hex().length(24).optional(),
    ratingAverage:Joi.number().min(1).optional(),
    ratingCount:Joi.number().min(0).optional(),   
})
/**
 * This is Delete Product validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex     ---------------------> required
 */
export const deleteProductSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Get Product by id validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex     ---------------------> required
 */
export const getProductByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})