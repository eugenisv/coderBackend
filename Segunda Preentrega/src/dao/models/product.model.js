import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    code : {
        type: String,
        unique: true
    },
    stock: Number,
    description : String,
    thumbnails: String,
    category: String,
    status : Boolean
})

export const productModel = mongoose.model(productCollection, productSchema)