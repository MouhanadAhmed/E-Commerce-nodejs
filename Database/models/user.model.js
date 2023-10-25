import { Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    name:{
        type:string,
        trim:true,
        required:[true,'name is required'],
        minlength: [1, 'too short user name'],
    },
    email:{
        type:String,
        trim:true,
        required:[true, 'email required'],
        unique:[true,'email must be unique'],
        minlength:1
    },
    password:{
        type:String,
        required:true,
        minlength: [5, 'too short user password']
    },
    phone:{
        type:String,
        required:[true,'phone number required'],
    },
    profilePic:String,
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    changePasswordAt:Date,
    isActive:{
        type:Boolean,
        default:true
    },
    wishList: [{
        type: Types.ObjectId,
        ref:'product'
    }],
    address: [{
        city: String,
        street: String,
        phone:String
    }],
    verified:{
        type:Boolean,
        default:false
    },


},{
    timestamps:true
})
userSchema.pre("save", function   ()  {
    this.password = bcrypt.hashSync(this.password,7)
})
export const userModel = model('user',userSchema)