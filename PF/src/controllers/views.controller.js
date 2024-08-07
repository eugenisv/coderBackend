import ProductService from "../services/db/dao/products.dao.js";
import CartService from "../services/db/dao/carts.dao.js";
const productService = new ProductService();
const cartService = new CartService();

export const getProductsView = async (req, res)=> {  
    try {
        const response = await productService.getAll(req);
        const obj = { response, session: req.session };
        res.render('products', obj);
        } catch (error) {
        console.log("Problema al conectarse con el servicio de Producto (View)")
        res.status(500).send({error : error});
    }
} 

export const getProdIdViews = async (req, res) => {
    try {
        const product = await productService.getById(req.params.pid);
        console.log(product)
        if (product)   {
            res.render('product', product);
        } 
        else  res.render("404");
    } catch (error) {
        console.error("Error al conectarse con el product service en view");
    }
}

export const getCartIdViews = async (req, res) => {
    try {
        const cart = await cartService.getById(req.params.cid);
        if (cart)   {
            const products = cart.products;
            res.render('cart', {products});
        } 
        else  res.render("404");
    } catch (error) {
        console.error("Error al conectarse con el cart service en view");
    }
}
