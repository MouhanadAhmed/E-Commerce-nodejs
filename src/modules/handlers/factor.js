import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";

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

export const addOne=(model,results) =>{
    return catchAsyncError(async (req,res,next) => {
        cloudinary.uploader.upload(req.file.path, 
            async function (error,result){
                req.body.image= results.secure_url;
                req.body.slug= slugify(req.body.name);
                const document = new model(req.body);
                await document.save();
                let response= {}
                response[results] = document;
                res.status(201).json({message:"Success", ...response});
            })
        // req.body.image = req.file.filename
        // req.body.slug= slugify(req.body.name);
        // const document = new model(req.body);
        // await document.save();
        // let response= {}
        // response[result] = document;
        // res.status(201).json({message:"Success", ...response});
    })
}

export const getAll = (model,result) =>{
    return catchAsyncError(async (req,res,next) => {
        let filters ={};
        if(req.params && req.params.id){
            filters = {
                category :req.params.id
            }
        }
        let documents = await model.find(filters);
        let response= {}
        response[result] = documents;
        res.status(200).json({message:"Success", ...response});
    })
}

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