import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        required:true,
        trim:true,
        minlength:[3, ' too short category name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:{
        type:String,
        // required:true
    }
},{
    timestamps:true
})
// categorySchema.post('init', function(doc){
//     doc.image= process.env.BASE_URL +'category/'+ doc.image
//     console.log(doc)
// })
export const categoryModel = model('category',categorySchema)