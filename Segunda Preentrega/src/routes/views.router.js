import express from 'express';
import { productModel } from "../dao/models/product.model.js";
import { getProductsParams } from './products.router.js';
import { getProducts } from './products.router.js';
import { cartModel } from '../dao/models/carts.model.js';


//Filesystem
// import ProductManager from "../dao/ProductManager.js";
// const productManager = new ProductManager;

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const response = await getProductsParams(req.query.limit, req.query.page, req.query.sort, req.query.query);
        response.prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}`: null;
        response.nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}`: null;
        res.render('products', response)

    } catch (error) {
        console.error('Error en GET/, no se pueden obtener productos' + error)
    }
})

router.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.findById(pid);
        console.log(product)
        if (product.acknowledged !== false)   {
            res.render("product", product);
        }
        else  console.error({status: "failure", message: 'Producto no encontrado', payload: product});
    } catch (error) {
        console.error('No se pudo obtener producto con ID')
        res.status(404).send({status: "failure", message: 'No se pudo obtener la base de datos con Mongoose' + error});
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartModel.findById(cid).populate('products.product').lean();
        console.log(cart)
        const products = cart.products;
        res.render('cart', {products});
       
    } catch (error) {
        console.error({status: 'failure', message: 'Carrito no encontrado', payload: error});
    }
})

router.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await getProducts();
        res.render('realTimeProducts', {products});

    } catch (error) {
        console.error('Error en GET/, no se puede obtener productos', error);
    }
})



router.get('/chat', (req, res) => {
    res.render('chat', {})
})

// FS
// const productManager = new ProductManager;
// const products = productManager.getProducts()

// router.get('/', (req, res) => {
//     res.render('home', {products})
// })
// router.get('/realTimeProducts', (req, res) => {
//     res.render('realTimeProducts', {products})
// })

export default router;