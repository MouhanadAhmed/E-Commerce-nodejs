import { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({
    code:{
        type:String,
        required: [true, 'coupon code required'],
        trim:true,
        unique: true
    },
    discount: {
        type: Number,
        min: 0,
        required: [true, 'coupon discount required'],

    },
    expires: {
        type: String,
        required: [true, 'coupon date required'],
    }
},{
    timestamps:true
})

export const couponModel = model('coupon',couponSchema)