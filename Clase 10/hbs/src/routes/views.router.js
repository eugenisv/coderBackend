import express from 'express'
import ProductManager from "../public/scripts/ProductManager.js";

const router = express.Router();

// crear productos (Base de datos)

const productManager = new ProductManager
productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnails: 'Sin imagen' , code: 'abc123', stock:25, category: "mula"})

productManager.addProduct({title : 'producto prueba2', description: 'Este es un producto prueba2', price:200, thumbnails: 'Sin imagen' , code: '123', stock:5, category: "mula"})

const products = productManager.getProducts()


router.get("/", (req, res) => {
    
    res.render("home",
        {
            products
        })
})



export default router