import { Router } from "express";
//import CartManager from "../dao/CartManager.js"; //FileSystem
//import ProductManager from "../dao/ProductManager.js";

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
        const cart = await cartModel.find({_id: {$eq: cid}}).populate('products.product');
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
        const encontrado = cart.products.find( p => p.product.equals(toAddProduct._id));
        if (encontrado) {
            encontrado.quantity++;
        }
        else {
            let newProduct = {product : toAddProduct._id, quantity : 1}
            cart.products.push(newProduct)  
        } 
        await cart.save() 
        res.send({status:'success', message: 'Producto Añadido al carrito'})
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito o producto por ID ' + error})
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid);
        const toDeleteProduct = await productModel.findById(pid);
        const index = cart.products.findIndex( p => p.product.equals(toDeleteProduct._id));
        if (index !== -1) {
            cart.products.splice(index, 1);
            res.send({status:'success', message: 'Producto Eliminado del Carrito'})
        }
        else {
            res.send({status:'error', message: 'No existe el producto en el carrito'})
        } 
        await cart.save() 
    
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito o producto por ID ' + error})
    }
}) 

router.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid);
        if(cart) {
            cart.products = [];
            res.send({status:'success', message: 'El carrito está vacío'});
            await cart.save();
        }
        else {
            res.send({status:'error', message: 'No se ha encontrado el carrito'});
        }
    
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito y eliminar sus productos ' + error})
    }
}) 

router.put('/:cid', async (req, res)=> {
    try {
        const cid = req.params.cid;
        let cambios = req.body
        const cart = await cartModel.findByIdAndUpdate(cid, {products : cambios}, {new : true});
        if (!cart) return res.status(404).send({ status: 'failure', message: 'Carrito no encontrado' });
        res.send({ status: 'success', message: 'Carrito actualizado', payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'Failure', message: 'Error al actualizar el carrito ' + error});
    }
    
})

router.put('/:cid/products/:pid', async (req, res)=> {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        let newQuantity = req.body.quantity;
        if (isNaN(newQuantity)) return res.status(404).send({ status: 'failure', message: 'Cantidad no válida, debe ser un número entero' });
        else {
            const cart = await cartModel.findById(cid);
            const index = cart.products.findIndex( p => p.product.equals(pid));
            cart.products[index].quantity = newQuantity;
            cart.save();
            if (!cart) return res.status(404).send({ status: 'failure', message: 'Carrito no encontrado' });
            res.send({ status: 'success', message: 'Carrito actualizado', payload: cart });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'Failure', message: 'Error al actualizar el carrito ' + error});
    }
    
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