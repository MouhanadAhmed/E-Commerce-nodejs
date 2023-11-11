import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addOne } from '../../utils/handlers/refactor.handler.js';
import { userModel } from '../../../Database/models/user.model.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import AppError from '../../utils/services/AppError.js';
import { sendEmail } from '../../email/sendEmail.js';



export const signUp =addOne(userModel,"User");

export const signIn = catchAsyncError(async (req,res,next) => {
    let {email, password} = req.body;
    let isFound = await userModel.findOne({email});
    const match = await bcrypt.compare(password,isFound.password);
    if(!isFound.verified) return next(new AppError("please verify your email first",401))
    if(isFound && match){
        // isFound.isAtive=true;
        // console.log(isFound);
        let loggedIn = await userModel.findByIdAndUpdate( isFound._id, {isActive:true,$unset:{loggedOutAt: 1}}, {new:true});
        console.log(loggedIn);
        let token = jwt.sign({name:isFound.name, userId:isFound._id, role:isFound.role},"treka");
        sendEmail();
        return res.json({message:"Success",token})
    }
    next(new AppError("incorrect email or password",401))
})

export const logOut = catchAsyncError(async (req,res,next) => {
    let {token} = req.headers;
    if(!token) return next(new AppError("Please provide token",401));

    let decoded = await jwt.verify(token,"treka");
    console.log(decoded);

    let user = await userModel.findByIdAndUpdate(decoded.userId,{isActive:false,loggedOutAt:Date.now()}, {new:true} );
    if(!user) return next(new AppError("Invalid user",404));
    user.isActive = false;
    user.loggedOutAt = Date.now();
    return res.json({message:"Success",user})
})

export const protectedRoutes = catchAsyncError(async (req,res,next)=>{
    let {token} = req.headers;
    if(!token) return next(new AppError("Please provide token",401));

    let decoded = await jwt.verify(token,"treka");
    console.log(decoded);

    let user = await userModel.findById(decoded.userId);
    if(!user) return next(new AppError("Invalid user",404));

       if(user.changePasswordAt) { 
        let changePasswordTime = parseInt(user.changePasswordAt?.getTime()/1000);

        if(  changePasswordTime > decoded.iat) return next (new AppError("Invalid token",401))
       }
       if(!user.isActive) return next (new AppError("Invalid token (user inActive)",401))


        req.user=user;
        next();
})

export const allowTo= (...roles)=>{

    return catchAsyncError( (req,res,next)=>{

        if(roles.includes(req.user.role)){
            return next();
        }
        return next(new AppError("Access denied",403))
    })


}

// export const forgotPassword = catchAsyncError(async (req,res,next) => {
//     let {email} = req.body;
//     let user = await userModel.findOne({email});
//     if(!user) return next(new AppError("User with this email not found",404));

//     let resetToken = jwt.sign({userId:user._id},"treka",{expiresIn:"1h"});
//     user.reset
// })

export const verifyEmail =  (req,res,next)=>{
    let {token} = req.params;
    jwt.verify(token,process.env.VERIFY_SECRET,async(err,decoded)=>{
        if(err) return next (new AppError("Invalid token",401))
      const updateUser =   await userModel.findByIdAndUpdate(decoded.id, {verified:true}, {new:true});
      res.json({message:"Success",updateUser});
    })
}
