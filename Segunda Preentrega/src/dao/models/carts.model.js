import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema( {
    products : [{ product: mongoose.Schema.Types.ObjectId, quantity: Number}],
    id : String
})

export const cartModel = mongoose.model(cartsCollection, cartSchema);

