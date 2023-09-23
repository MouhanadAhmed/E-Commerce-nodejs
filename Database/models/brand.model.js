import { Schema, Types, model } from "mongoose";

const brandSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'name is required'],
        trim:true,
        minLength:[2,'too short brand name']
    },
    slug:{
        type:String,
        lowercase:true
    },
    logo:{
        type:String,
        // required:true
    }
},{
    timestamps:true
})

export const brandModel = model('brand',brandSchema)