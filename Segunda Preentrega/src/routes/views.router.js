import express from 'express';
import { productModel } from "../dao/models/product.model.js";

//Filesystem
// import ProductManager from "../dao/ProductManager.js";
// const productManager = new ProductManager;

const router = express.Router();

async function getProducts () {
    try {
        const products = await productModel.find().lean();
        return products;
    } catch (error) {
        console.error('No se puede obtener los productos con Mongoose en getProducts()', error);
    }
}

router.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.render('home', {products});

    } catch (error) {
        console.error('Error en GET/, no se puede obtener productos', error);
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