import { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        trim: true,
        required: [true, 'review comment required']

    },
    product: {
        type:Types.ObjectId,
        ref: "product"
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
    timestamps:true
})

reviewSchema.pre(/^find/, function () {
    this.populate('user','name');
})

export const reviewModel = model('review',reviewSchema)