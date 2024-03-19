import express from 'express';
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager;

const router = express.Router();

let products = productManager.getProducts();
router.get('/', (req, res) => {
    res.render('home', {products})
})



router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
})

// router.get('/realTimeProducts', (req, res) => {
//     res.render('realTimeProducts', {products})
// })

export default router;