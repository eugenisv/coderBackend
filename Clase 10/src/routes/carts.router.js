import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";


const router = Router();
// crear base de datos
const cartManager = new CartManager
const productManager = new ProductManager
router.post('/', (req,res)=> {
    cartManager.addCart()
    res.send({ status: "Success", msg: 'Carrito creado' })
    
})

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cid);
    if (!cart) {
      res.status(404).send('Carrito no encontrado');
    } else {
      res.json(cart);
    }
})

router.post('/:cid/product/:pid', (req, res)=> {
    const newProductId = req.params.pid
    const cartId = req.params.cid
    const cart = cartManager.getCartById(cartId);
    const product = productManager.getProductById(parseInt(newProductId));
    if (!product) {
        res.status(404).send(`Producto con id "${newProductId}" no encontrado`);
    }
    else if (!cart) {
        res.status(404).send(`Carrito con id "${cartId}" no encontrado`);
    }
    else {
        cartManager.addProdinCart(cartId, newProductId);
        res.send({ status: "Success", msg: 'El producto fue añadido al carrito' })
    }
   
})

export default router;