import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        unique:[true,'product name is not available'],
        required:[true,'product name is required' ],
        trim:true,
        minlength: [2, 'too short product name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    price:{
        type:Number,
        min:0,
        required:[true, 'product price is required']
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
    },
    description:{
        type:String,
        trim:true,
        maxlenght: [300, 'too long product description'],
        minlength: [5, 'too short product description'],
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
    imgCover:String,
    images:[String],
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
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
})

productSchema.post("init", (doc) => {
    doc.imgCover = process.env.BASE_URL + "product/" + doc.imgCover;
    if (doc.images) doc.images = doc.images.map((path) => process.env.BASE_URL + "product/" + path);
  }); 
  
//   productSchema.virtual("myReview", {
//     ref: "review",
//     localField: "_id",
//     foreignField: "product"
//   });
//   productSchema.pre(/^find/, function () {
//     this.populate("myReview");
// })
export const productModel = model('product',productSchema)