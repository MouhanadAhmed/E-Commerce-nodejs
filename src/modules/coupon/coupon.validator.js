import Joi from "joi";

/**
 * This is Create Coupon validation Schema - validates the following fields :
 * - code (String) : minimum 2 chars, maximum 30 chars             --------------------> required
 * - discount (Number) : minimum value 0, maximum value 100                ------------> required
 * - expires (Date)      --------------------------------------------------------------> required
 */
export const createCouponSchema = Joi.object({
    code:Joi.string().min(2).max(30).required(),
    discount:Joi.number().min(0).max(100).required(),
    expires:Joi.date().required()
})
/**
 * This is Update Coupon validation Schema - validates the following fields :
 * - code (String) : minimum 2 chars, maximum 30 chars             
 * - discount (Number) : minimum value 0, maximum value 100                
 * - expires (Date)      
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const updateCouponSchema = Joi.object({
    code:Joi.string().min(2).max(30),
    discount:Joi.number().min(0).max(100),
    expires:Joi.date(),
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Delete Coupon validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const deleteCouponSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Get Coupon by id validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const getCouponByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})