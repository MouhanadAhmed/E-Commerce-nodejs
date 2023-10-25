import { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({
    name:{
        type:String,
        unique:[true,'name is rewuired'],
        required:true,
        trim:true,
        minlength:[3, ' too short subCategory name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:Types.ObjectId,
        ref:'category',
        required:true
    }
},{
    timestamps:true
})

export const subCategoryModel = model('subCategory',subCategorySchema)