import {reviewModel} from '../../../Database/models/review.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';


/**
 * This is Add Review Controller
 */
export const addReview = addOne(reviewModel,"review");
/**
 * This is Get All Reviews Controller
 */
export const getAllReviews = getAll(reviewModel,"reviews");
/**
 * This is Update Review Controller
 */
export const updateReview = updateOne(reviewModel,"review");
/**
 * This is Delete Review Controller
 */
export const deleteReview = deleteOne(reviewModel,"review");

/**
 * This is Get Review by Id Controller
 */
export const getReviewById = getById(reviewModel, 'review');