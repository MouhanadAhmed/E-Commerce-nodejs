import Joi from "joi";


export const createSubCategorySchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    category:Joi.string().hex().length(24).required()
})

export const getSubCategoryByIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})
export const deleteSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
export const updateSubCategorySchema=Joi.object({
    name:Joi.string().min(2).max(30).required(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24).optional()
})
