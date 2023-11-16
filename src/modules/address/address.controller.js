import { userModel } from '../../../Database/models/user.model.js';
import { deleteOne, getById, updateOne } from '../../utils/handlers/refactor.handler.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';


/**
 * This is Add user address  Controller
 */
export const addAddress = updateOne(userModel,"address");
/**
 * This is Get user Addresses Controller
 */
export const getAllAddresses = catchAsyncError(async (req,res,next) =>{
    let user = await userModel.findOne({_id:req.user.id});
    user && res.status(200).json({message:"Success", address:user.address});
    !user &&   next(new AppError(`Invalid user Id`,404))
})

/**
 * This is Delete user address Controller
 */
export const removeAddress = deleteOne(userModel,"address");
/**
 * This is Get specific user Address by id Controller
 */
export const getSpecificAddress = getById(userModel,"address")