import Joi from "joi";

/**
 * This is add/remove product to wishlist validation Schema - validates the following fields :
 * - product (String) : length 24 numbers , hex--------------> required
 */
export const addRemoveWishlistSchema = Joi.object({
    product: Joi.string().hex().length(24).required()   
})
