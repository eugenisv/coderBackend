import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema( {
    products : Array,
    id : String
})

export const cartModel = mongoose.model(cartsCollection, cartSchema);

