import  AppError  from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import slugify from "slugify";
import cloudinary from "../cloudinary.js";
import ApiFeatures from "../APIFeatures.js";
import bcrypt from 'bcrypt';
import { sendEmail } from "../../email/sendEmail.js";
import jwt from 'jsonwebtoken';





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

                }else{

                    req.body.image= req.file.filename;
                }
                req.body.slug= slugify(req.body.name);
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
        const {id}= req.params;
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
            let document = await model.findById(id);
            let response= {}
            response[result] = document;
            document && res.status(200).json({message:"Success",...response});
           !document &&   next(new AppError(`Invalid ${result} Id`,404))
        })
}