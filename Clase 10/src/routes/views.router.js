import express from 'express';
import ProductManager from '../public/js/ProductManager.js'

const productManager = new ProductManager

const router = express.Router();

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})


router.get("/message", (req, res) => {
    res.render("messages");
});

export default router;