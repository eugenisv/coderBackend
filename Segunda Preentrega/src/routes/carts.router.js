import { Router } from "express";
import CartManager from "../dao/CartManager.js";
import ProductManager from "../dao/ProductManager.js";

import { cartModel } from "../dao/models/carts.model.js";
import { productModel } from "../dao/models/product.model.js";


const router = Router();

//MONGO
router.post('/', async (req,res)=> {
    try {
        const newCart = await cartModel.create({products : []})
        res.send({ status: "Success", msg: 'Carrito creado', payload: newCart})

    } catch (error) {
        res.status(500).send({status: 'failure', message: 'No se ha podido crear carrito ' + error})
    }
    
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartModel.find({_id: {$eq: cid}});
        res.json(cart);
       
    } catch (error) {
        res.status(500).send({status: 'failure', message: 'Carrito no encontrado', payload: error});
    }
})

router.post('/:cid/product/:pid', async (req, res)=> {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid);
        const toAddProduct = await productModel.findById(pid);
        console.log(cart, toAddProduct);
        const encontrado = cart.products.find( p => p.product.equals(toAddProduct._id));
        console.log(encontrado)
        if (encontrado) {
            console.log(encontrado) //{ product: new ObjectId('65fc4a804eeb5b499fedf6b8'), quantity: 1 }
            encontrado.quantity++;
            console.log(encontrado) //{ product: new ObjectId('65fc4a804eeb5b499fedf6b8'), quantity: 2 }
        }
        else {
            let newProduct = {product : toAddProduct._id, quantity : 1}
            console.log(newProduct)
            cart.products.push(newProduct)  
        } 
        await cart.save() 
        res.send({status:'success', message: 'Producto Añadido al carrito'})
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito o producto por ID ' + error})
    }

    
    // if (!product) {
    //     res.status(404).send(`Producto con id "${newProductId}" no encontrado`);
    // }
    // else if (!cart) {
    //     res.status(404).send(`Carrito con id "${cartId}" no encontrado`);
    // }
    // else {
    //     cartManager.addProdinCart(cartId, newProductId);
    //     res.send({ status: "Success", msg: 'El producto fue añadido al carrito' })
    // }
   
})

//CODIGO VIEJO
// crear base de datos
// const cartManager = new CartManager
// const productManager = new ProductManager

// router.post('/', (req,res)=> {
//     cartManager.addCart()
//     res.send({ status: "Success", msg: 'Carrito creado' })
// })

// router.get('/:cid', (req, res) => {
//     const cid = parseInt(req.params.cid);
//     const cart = cartManager.getCartById(cid);
//     if (!cart) {
//       res.status(404).send('Carrito no encontrado');
//     } else {
//       res.json(cart);
//     }
// })

// router.post('/:cid/product/:pid', (req, res)=> {
//     const newProductId = req.params.pid
//     const cartId = req.params.cid
//     const cart = cartManager.getCartById(cartId);
//     const product = productManager.getProductById(parseInt(newProductId));
//     if (!product) {
//         res.status(404).send(`Producto con id "${newProductId}" no encontrado`);
//     }
//     else if (!cart) {
//         res.status(404).send(`Carrito con id "${cartId}" no encontrado`);
//     }
//     else {
//         cartManager.addProdinCart(cartId, newProductId);
//         res.send({ status: "Success", msg: 'El producto fue añadido al carrito' })
//     }
   
// })

export default router;