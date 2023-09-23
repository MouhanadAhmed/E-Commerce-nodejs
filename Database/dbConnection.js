import mongoose from "mongoose";


export function dbConnection() {
    mongoose.connect('mongodb+srv://mouhanadahmed2:va44ws167MraIjD6@mymongodb.l1ihnxo.mongodb.net/E-commerce').then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(`db Error ${err}`);
    })
}