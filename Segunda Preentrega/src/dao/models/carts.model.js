import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema( {
    products : {
        type: [
            { 
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref : 'products'
                }, 
                quantity: Number
            
            }
        ],
        default : []
    },
    id : String
})

export const cartModel = mongoose.model(cartsCollection, cartSchema);

