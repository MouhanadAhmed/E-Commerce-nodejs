import { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema({
    text:{
        type:string,
        required:true,
        trim:true,
    },
    product:{
        type:Types.ObjectId,
        ref:'product',
        required:true
    },
    user:{
        type:Types.ObjectId,
        ref:'user',
        required:true
    },
    rate:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    }
},{
    timestamps:true
})

export const reviewModel = model('review',reviewSchema)