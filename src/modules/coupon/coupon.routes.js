
import express from 'express';
import * as couponControllers from './coupon.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { createBrandSchema, createCouponSchema, deleteBrandSchema, deleteCouponSchema, getBrandByIdSchema, getCouponByIdSchema, updateBrandSchema, updateCouponSchema } from './coupon.validator.js';
import { allowTo, protectedRoutes } from '../auth/auth.controller.js';
const couponRouter =  express.Router();

couponRouter.route('/')
        .post(protectedRoutes,allowTo('admin'),validation(createCouponSchema),couponControllers.addCoupon)
        .get(protectedRoutes,allowTo('admin'),couponControllers.getAllCoupons)


couponRouter.route('/:id')
        .get(protectedRoutes,allowTo('admin'),validation(getCouponByIdSchema),couponControllers.getCouponById)
        .put(protectedRoutes,allowTo('admin'),validation(updateCouponSchema),couponControllers.updateCoupon)
        .delete(protectedRoutes,allowTo('admin'),validation(deleteCouponSchema),couponControllers.deleteCoupon)

export default couponRouter;