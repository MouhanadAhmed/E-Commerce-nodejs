import {couponModel} from '../../../Database/models/coupon.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';


/**
 * This is Add Coupon Controller
 */
export const addCoupon = addOne(couponModel,"coupon");
/**
 * This is Get All Coupons Controller
 */
export const getAllCoupons = getAll(couponModel,"coupon");
/**
 * This is Update Coupon Controller
 */
export const updateCoupon = updateOne(couponModel,"coupon");
/**
 * This is Delete Coupon Controller
 */
export const deleteCoupon = deleteOne(couponModel,"coupon");

/**
 * This is Get Coupon by Id Controller
 */
export const getCouponById = getById(couponModel, 'coupon');