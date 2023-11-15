
import express from 'express';
import * as wishlistControllers from './wishlist.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { protectedRoutes } from '../auth/auth.controller.js';
const wishListRouter =  express.Router();



wishListRouter.route('/')
        .patch(protectedRoutes,wishlistControllers.addToWishlist)
        .delete(protectedRoutes,wishlistControllers.removeFromWishlist)
        .get(protectedRoutes,wishlistControllers.getAllwishlist)


export default wishListRouter;