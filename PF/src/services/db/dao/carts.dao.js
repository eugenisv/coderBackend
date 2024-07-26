import { cartModel } from "../models/carts.model.js";
import ProductService from "./products.dao.js";
const productService = new ProductService;
export default class CartService {
    getById = async (cid) =>  {
        try {
            const cart = await cartModel.findById(cid).populate('products.product').lean();
            return cart;
        } catch (error) {
            console.error({status: 'failure', message: 'Carrito no encontrado', payload: error});
        }
       
    }

    createCart = async() => {
        try {
            const newCart = await cartModel.create({products : []});
            return newCart;
            
        } catch (error) {
            console.error('Error al conectar el service con Mongoose: ' + error)
        }
    }

    update = async (cid, changes) => {
        const cart = await cartModel.findByIdAndUpdate(cid, {products : changes}, {new : true});
        return cart;
    }

    addProduct = async (cid, pid) => {
        const cart = await cartModel.findById(cid);
        const toAddProduct = await productService.getById(pid);
        const found = cart.products.find( p => p.product.equals(toAddProduct._id));
        if (found) {
            found.quantity++;
        }
        else {
            let newProduct = {product : toAddProduct._id, quantity : 1}
            cart.products.push(newProduct)  
        } 
        await cart.save() 
        return cart;
    }

    changeProductQuantity = async (cid, pid, newQuantity) => {
        try {
            const cart = await cartModel.findById(cid);
            const index = cart.products.findIndex( p => p.product.equals(pid));
            cart.products[index].quantity = newQuantity;
            await cart.save();
            return cart
        } catch (error) {
            
        }
    }

    deleteProduct = async (cid, pid) => {
        try {
        const cart = await cartModel.findById(cid);
        const toDeleteProduct = await productService.getById(pid);
        const index = cart.products.findIndex( p => p.product.equals(toDeleteProduct._id));
        if (index !== -1) {
            cart.products.splice(index, 1);
            await cart.save();
        }
        return index;
 
        } catch (error) {
            console.error('Error al eleminar carrito del producto entre service y model ' +error);
        }
    }

    delete = async (cid) => {
        try {
            const cart = await cartModel.findById(cid);
            if(cart) {
                cart.products = [];
                await cart.save();
                return true;
            }
            else {
               return false;
            }
        } catch (error) {
            
        }
    }


}