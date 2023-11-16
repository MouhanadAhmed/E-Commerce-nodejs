
import express from 'express';
import * as wishlistControllers from './wishlist.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { protectedRoutes } from '../auth/auth.controller.js';
import { addRemoveWishlistSchema } from './wishlist.validator.js';
const wishListRouter =  express.Router();



wishListRouter.route('/')
        .patch(protectedRoutes,validation(addRemoveWishlistSchema),wishlistControllers.addToWishlist)
        .delete(protectedRoutes,validation(addRemoveWishlistSchema),wishlistControllers.removeFromWishlist)
        .get(protectedRoutes,wishlistControllers.getAllwishlist)


export default wishListRouter;