import { cartModel } from "../../dao/models/carts.model.js";
export default class CartService {
    getById = async (cid) =>  {
        try {
            const cart = await cartModel.findById(cid).populate('products.product').lean();
            const products = cart.products;
            return products;
        } catch (error) {
            console.error({status: 'failure', message: 'Carrito no encontrado', payload: error});
        }
       
    }
}