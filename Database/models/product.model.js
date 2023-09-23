import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        unique:[true,'product name is not available'],
        required:[true,'product name is required' ],
        trim:true,
        minlength: [10, 'too short product name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    price:{
        type:Number,
        default:0,
        min:0,
        required:[true, 'product price is required']
    },
    priceAfterDiscount:{
        type:Number,
        // default:0,
        min:0,
    },
    description:{
        type:String,
        trim:true,
        maxlenght: [100, 'description should be less than or equal 100 charcters'],
        minlength: [10, 'too short product description'],
        required:[true,'product description is required']
    },
    quantity:{
        type:Number,
        default:0,
        min:0,
        required:[true,'product quantity is required']

    },
    sold:{
        type:Number,
        default:0,
        min:0,
    },
    imgCover:{
        type:String,
        // required:true
    },
    images:{
        type:[String]
    },
    category:{
        type:Types.ObjectId,
        ref:'category',
        required:[true, 'product category is required']
    },
    subCategory:{
        type:Types.ObjectId,
        ref:'subCategory',
        required:[true, 'product subcategory is required']
    },
    brand:{
        type:Types.ObjectId,
        ref:'brand',
        required:[true, 'product brand is required']

    },
    ratingAverage:{
        type:Number,
        min:[1,'rating average must be greater than 1'],
        max:[5,'rating average must be less than 5'],
    },
    ratingCount:{
        type:Number,
        default:0,
        min:0

    }
},{
    timestamps:true
})

export const productModel = model('product',productSchema)