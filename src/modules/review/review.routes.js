
import express from 'express';
import * as reviewControllers from './review.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { createBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from './review.validator.js';
import { protectedRoutes } from '../auth/auth.controller.js';
const reviewRouter =  express.Router();

reviewRouter.route('/')
        .post(protectedRoutes,reviewControllers.addReview)
        .get(reviewControllers.getAllReviews)


reviewRouter.route('/:id')
        .get(reviewControllers.getReviewById)
        .put(protectedRoutes,reviewControllers.updateReview)
        .delete(protectedRoutes,reviewControllers.deleteReview)

export default reviewRouter;