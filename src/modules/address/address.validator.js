import Joi from "joi";

/**
 * This is Add Address validation Schema - validates the following fields :
 * - city (String) : minimum 2 chars, maximum 30 chars     ------------> required
 * - street (String) : minimum 5 chars, maximum 15 chars     ----------> required
 * - phone (String) : minimum 5 chars, maximum 15 chars       ---------> required
 */
export const addAddressSchema = Joi.object({
    city:Joi.string().min(3).max(15).required(),
    street:Joi.string().min(5).max(30).required(),
    phone:Joi.string().min(5).max(30).required(),
})
/**
 * This is Update Address validation Schema - validates the following fields :
 * - city (String) : minimum 2 chars, maximum 30 chars     ------------> required
 * - street (String) : minimum 5 chars, maximum 15 chars     ----------> required
 * - phone (String) : minimum 5 chars, maximum 15 chars       ---------> required
 * - id (String) : length 24 numbers , hex-----------------------------> required
 */
export const updateAddressSchema = Joi.object({
    city:Joi.string().min(3).max(15).required(),
    street:Joi.string().min(5).max(30).required(),
    phone:Joi.string().min(5).max(30).required(),
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Delete Address validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const deleteAddressSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Get Address by id validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const getAddressByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})