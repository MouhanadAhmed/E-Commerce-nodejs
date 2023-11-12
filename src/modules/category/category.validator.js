import Joi from "joi";

/**
 * This is Create Category validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars     ------------> required
 */
export const createCategorySchema = Joi.object({
    name:Joi.string().min(2).max(30).required()
})
/**
 * This is Get Category by id validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const getCategoryByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})
/**
 * This is Delete Category validation Schema - validates the following fields :
 * - id (String) : length 24 numbers , hex-----------------------> required
 */
export const deleteCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Update Category validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars       ------------> required
 * - id (String) : length 24 numbers , hex-------------------------------> required
 */
export const updateCategorySchema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required()
})
