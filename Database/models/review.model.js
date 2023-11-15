import { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: [true, 'review comment required']

    },
    product: {
        type:Types.ObjectId,
        ref: "product",
        required: [true, 'reviewed product id required']
    },
    user: {
        type: Types.ObjectId,
        ref: "user"

    },
    rating: {
        type: Number,
        min: 1,
        max:5
    }
},{
    timestamps:true,
    // toJSON: { virtuals: true }, 
    // toObject: { virtuals: true }
})

// reviewSchema.pre(/^find/, function () {
//     this.populate('user','name');
//     this.populate('product','name');
// })

export const reviewModel = model('review',reviewSchema)