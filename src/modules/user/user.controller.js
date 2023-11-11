import {userModel} from '../../../Database/models/user.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';


/**
 * *This is Add User Controller, 

 */
export const addUser = addOne(userModel,"User");
/**
 * *This is Get All Users Controller, 

 */
export const getAllUsers = getAll(userModel,"Users");
/**
 * *This is Update User Controller, 

 */
export const updateUser = updateOne(userModel,"User");
/**
 * *This is Delete User Controller, 

 */
export const deleteUser = deleteOne(userModel,"User");

/**
 * *This is Get User by Id Controller, 

 */
export const getUserById = getById(userModel, 'User');

/**
 * *This is Update User Controller, 

 */
export const changePassword = catchAsyncError(async (req,res,next) => {
    const {id}= req.params;
    if(req.body.name) req.body.slug= slugify(req.body.name);
    let document = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    document && res.status(200).json({message:"Success", document});
    !document &&   next(new AppError(`Invalid ${result} Id`,404))
});