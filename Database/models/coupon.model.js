import { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({
    code:{
        type:string,
        required:true,
        trim:true,
    },
    expiresAt:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true,
        min:0,
    
    },
    rate:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    }
},{
    timestamps:true
})

export const couponModel = model('coupon',couponSchema)