import  AppError  from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import slugify from "slugify";
import cloudinary from "../cloudinary.js";
import ApiFeatures from "../APIFeatures.js";

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
  
                // console.log(req.body,"req.body");
                if (results === 'Product') {
                    req.body.imgCover = req.files.imgCover[0].filename;
                    req.body.images = req.files.images.map(ele => ele.filename)
                }else if (results === "User"){
                    let user = await model.findOne({email:req.body.email});
                    console.log(user);
                    if(user) return next(new AppError("duplicate email",409));
                }else{

                    req.body.image= req.file.filename;
                }
                // console.log(req.body.image);
                req.body.slug= slugify(req.body.name);
                const document = new model(req.body);
                await document.save();
                let response= {}
                response[results] = document;
                res.status(201).json({message:"Success", ...response});

        // // req.body.image = req.file.filename
        // req.body.slug= slugify(req.body.name);
        // const document = new model(req.body);
        // await document.save();
        // let response= {}
        // response[results] = document;
        // res.status(201).json({message:"Success", ...response});
    })
}

export const getAll = (model,result) =>{
    return catchAsyncError(async (req,res,next) => {
        // // pagination
        // let page= req.query.page * 1 || 1;
        // if(req.query.page <=0 ) page=1;
        // let skip = (page -1) *4

        // //filters
        // let filterObj = {...req.query};
        // let excludeQuery = ['page','sort','keyword','fields'];
        // excludeQuery.forEach((q)=>{
        //     delete filterObj[q];
        // })
        // filterObj=JSON.stringify(filterObj);
        // filterObj= filterObj.replace(/\bgt|gte|lt|lte\b/g,match=> `$${match}`)
        // filterObj=JSON.parse(filterObj);
        //mergeParams
        let filters ={};
        if(req.params && req.params.id){
            filters = {
                category :req.params.id 
            }
        }
        
        // //sort
        // //build query
        // let mongooseQuery = model.find({...filters,...filterObj}).skip(skip).limit(4)

        // if(req.query.sort){
        //     let sortBy = req.query.sort.split(',').join(" ");
        //     mongooseQuery.sort(sortBy)
        // }
        // // search
        // if(req.query.keyword){
        // mongooseQuery.find({
        //     $or: [
        //         {name       :{ $regex   : req.query.keyword , $options : "i"}},
        //         {description :{ $regex   : req.query.keyword , $options : "i"}}
        //     ]
        // })
        // }

        // //fields
        // if(req.query.fields){
        //     let fields = req.query.fields.split(',').join(" ");
        //     mongooseQuery.select(fields)
        // }
        let apiFeature =   new ApiFeatures(model.find({...filters}), req.query).pagination().search().sort().fields().filter();
        // excute query
        let documents = await apiFeature.mongooseQuery;
        let response= {}
        let count = documents.length
        response[result] = documents;
        res.status(200).json({message:"Success",page:apiFeature.page,count:count, ...response});
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