import Joi from "joi";

/**
 * This is Create Sub-Category validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars -> required
 * - category (String) : length 24 chars -> required
 */
export const createSubCategorySchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    category:Joi.string().hex().length(24).required()
})
/**
 * This is Get Sub-Category by id validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 */
export const getSubCategoryByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})
/**
 * This is Delete Sub-Category  validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 */
export const deleteSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Update Sub-Category  validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars -> required
 * - id (String) : length 24 chars -> required
 * - category (String) : length 24 chars -> required
 */
export const updateSubCategorySchema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).optional()
})
