import Joi from "joi";


export const createProductSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    price:Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0).required(),
    description:Joi.string().min(10).max(100).required(),
    quantity:Joi.number().min(0).required(),
    sold:Joi.number().min(0).optional(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    ratingAverage:Joi.number().min(1).optional(),
    ratingCount:Joi.number().min(0).optional(),
})
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
    brand:Joi.string().hex().length(24).required(),
    ratingAverage:Joi.number().min(1).optional(),
    ratingCount:Joi.number().min(0).optional(),   
})
export const deleteProductSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
export const getProductByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})