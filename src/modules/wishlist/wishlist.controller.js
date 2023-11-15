import { userModel } from '../../../Database/models/user.model.js';
import { deleteOne, addOne, getAll, updateOne } from '../../utils/handlers/refactor.handler.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';


/**
 * This is Add to wishlist  Controller
 */
export const addToWishlist = updateOne(userModel,"wishlist");
/**
 * This is Get user Reviews Controller
 */
export const getAllwishlist = catchAsyncError(async (req,res,next) =>{
    let wishlist = await userModel.findOne({_id:req.user.id});
    wishlist && res.status(200).json({message:"Success", wishlist:wishlist.wishList});
    !wishlist &&   next(new AppError(`Invalid wishlist} Id`,404))
})

/**
 * This is Delete product from wishlist Controller
 */
export const removeFromWishlist = deleteOne(userModel,"wishlist");
