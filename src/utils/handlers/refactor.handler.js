import  AppError  from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import slugify from "slugify";
import cloudinary from "../cloudinary.js";
import ApiFeatures from "../APIFeatures.js";
import bcrypt from 'bcrypt';
import { sendEmail } from "../../email/sendEmail.js";
import jwt from 'jsonwebtoken';
import { reviewModel } from "../../../Database/models/review.model.js";
import  QRCode  from "qrcode";





/**
 * This is Delete One document  handler
 * ```
 *  Accepts id from Req.params
* ``` 
*  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const deleteOne=(model,result)=>{
    return catchAsyncError(async (req,res,next) => {
        const {id}= req.params;
        if(result ==="review") {
            // check for reviewed product existance
            let reviewed = await reviewModel.findOne({user:req.user._id,product:req.body.product})
            if(!reviewed) return next(new AppError("Unauthorized",409))
            req.body.user=req.user._id
        }else if (result ==="wishlist"){
            const{product} =req.body;
                    let document = await model.findByIdAndUpdate(req.user._id,{
                        $pull:{
                            wishList:product
                        }
                    },{new:true})
        let response= {}
        response[result] = document;
        document && res.status(200).json({message:"Success", ...response});
        !document &&   next(new AppError(`Invalid ${result} Id`,404))
        } else if (result === "address"){
            const{id:_id} =req.body;
            let addresses = await model.findById(req.user._id);
            let document = await model.findByIdAndUpdate(req.user._id,{
                $pull:{
                    address:{_id}
                }
            },{new:true})
            let response= {}
            response[result] = document;
            if(addresses.address.length === document.address.length) return next(new AppError(`Invalid address Id`,404));
            document && res.status(200).json({message:"Success", ...response});
            !document &&   next(new AppError(`Invalid user Id`,404))
        }
        let document = await model.findByIdAndDelete(id);
        let response= {}
        response[result] = document;
        document && res.status(200).json({message:"Success", ...response});
        !document &&   next(new AppError("document not found",404))
    })
}
/**
 * This is Add One document  handler
 * ```
 * - Accepts id from Req.params
 * - Verify user token to addd product 
 * - Send Verification Email to the user
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const addOne=(model,results) =>{
    return catchAsyncError(async (req,res,next) => {
  
                if (results === 'Product') {
                    req.body.imgCover = req.files.imgCover[0].filename;
                    req.body.images = req.files.images.map(ele => ele.filename)
                }else if (results === "User"){
                    let user = await model.findOne({email:req.body.email});
                    console.log(user);
                    if(user) return next(new AppError("Email already exists",409));

                }else if(results ==="review") {
                    // check for reviewed product existance
                    let reviewed = await reviewModel.findOne({user:req.user._id,product:req.body.product})
                    if(reviewed) return next(new AppError("Review already exists on the product",409))
                    req.body.user=req.user._id
                }

                req.file?.filename ?   req.body.image= req?.file?.filename:"";
                req.body.name ?   req.body.slug = slugify(req.body.name):"";
                const document = new model(req.body);
                await document.save();
                let response= {}
                response[results] = document;
                if(results === "User") {
                    let verifyToken = jwt.sign({id:document._id },process.env.VERIFY_SECRET)
                    sendEmail({email:req.body.email,api:`http://localhost:3000/api/v1/auth/verify/${verifyToken}`,sub:"Verify Email",text:"Tap the button below to confirm your email address. If you didn't create an account with Paste, you can safely ignore this email",title:"Confirm Your Email Address",btn:"Verify Email"})
                    
                }
                res.status(201).json({message:"Success", ...response});


    })
}
/**
 * This is Get all documents  handler
 * ```
 *API Features:
 * - Accepts id from Req.params for category 
 * - Pagination, Search, Sort, Fields & Filter 
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getAll = (model,result) =>{
    return catchAsyncError(async (req,res,next) => {

        let filters ={};
        if(req.params && req.params.id){
            filters = {
                category :req.params.id 
            }
        }
        

        let apiFeature =   new ApiFeatures(model.find({...filters}), req.query).pagination().search().sort().fields().filter();
        // excute query
        let documents = await apiFeature.mongooseQuery;
        let response= {}
        let count = documents.length
        response[result] = documents;
        res.status(200).json({message:"Success",page:apiFeature.page,count:count, ...response});
    })
}
/**
 * This is Update One document  handler
 * ```
 * - Accepts id from Req.params  
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const updateOne = (model,result) => {
    return catchAsyncError(async (req,res,next) => {
        let {id}= req.params;
        if(result ==="review") {
            // check for reviewed product existance
            let reviewed = await reviewModel.findOne({id,user:req.user._id,product:req.body.product})
            if(!reviewed) return next(new AppError("Unauthorized",409))
            req.body.user=req.user._id
        }else if (result ==="wishlist"){
            const{product} =req.body;
                    let document = await model.findByIdAndUpdate(req.user._id,{
                        $addToSet:{
                            wishList:product
                        }
                    },{new:true})
        let response= {}
        response[result] = document;
        document && res.status(200).json({message:"Success", ...response});
        !document &&   next(new AppError(`Invalid user Id`,404))
        } else if (result === "address"){
                    const{city,street,phone} =req.body;
                    let document = await model.findByIdAndUpdate(req.user._id,{
                        $addToSet:{
                            address:{city,street,phone}
                        }
                    },{new:true})
        let response= {}
        response[result] = document;
        document && res.status(200).json({message:"Success", ...response});
        !document &&   next(new AppError(`Invalid user Id`,404))
        }
        if(req.body.name) req.body.slug= slugify(req.body.name);
        let document = await model.findByIdAndUpdate(id,req.body,{new:true})
        let response= {}
        response[result] = document;
        document && res.status(200).json({message:"Success", ...response});
        !document &&   next(new AppError(`Invalid ${result} Id`,404))
    })
}
/**
 * This is Get One document by id handler
 * ```
 * - Accepts id from Req.params  
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getById = (model,result) => {
    return catchAsyncError(async (req,res,next) => {
            const {id}= req.params;
            if(result === "address") {
                const userId = req.user._id;
                const user = await model.findById(userId);
                const address= user.address.filter((item) => item._id ==id);
                !user &&   next(new AppError(`Invalid user Id`,404));
               if (address.length===0) return  next(new AppError(`Invalid address Id`,404));
                res.status(200).json({message:`Success`,address:address[0] });
                

            }
            let document = await model.findById(id);
            if(result === 'coupon') {
             let URL = await   QRCode.toDataURL(document.code);
              let response= {}
              response[result] = document;
              document && res.status(200).json({message:"Success",...response,url:URL});
            }
            let response= {}
            response[result] = document;
            document && res.status(200).json({message:"Success",...response});
           !document &&   next(new AppError(`Invalid ${result} Id`,404))
        })
}