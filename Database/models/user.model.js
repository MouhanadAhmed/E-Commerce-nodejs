import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:string,
        trim:true,
        required:[true,'name is required'],
        minlength: [3, 'too short user name'],
        unique:true,
    },
    email:{
        type:string,
        trim:true,
        required:[true, 'email required'],
        unique:[true,'email must be unique'],
        minlength:1
    },
    password:{
        type:string,
        required:true,
        minlength: [5, 'too short user password']
    },
    phone:{
        type:string,
        required:[true,'phone number required'],
    },
    profilePic:string,
    role:{
        type:string,
        enum:['admin','user'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        lowercase:false
    },

},{
    timestamps:true
})

export const userModel = model('user',userSchema)