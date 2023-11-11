import Joi from "joi";


export const createUserSchema = Joi.object({
    name:Joi.string().min(2).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().min(5).max(30).required(),
    phone:Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    role: Joi.string().pattern(/^(user|admin)$/)
})
export const updateUserSchema = Joi.object({
    name:Joi.string().min(2).max(30),
    password:Joi.string().min(5).max(30),
    phone:Joi.string().length(11).pattern(/^[0-9]+$/),
    id: Joi.string().hex().length(24).required()  ,
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    role: Joi.string().pattern(/^(user|admin)$/)
})
export const deleteUserSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
export const getUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})