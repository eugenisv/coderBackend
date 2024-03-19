import express from 'express';
import ProductManager from '../public/js/ProductManager.js'

const productManager = new ProductManager

const router = express.Router();
let products = productManager.getProducts
router.get('/hbs', (req, res) => {
    res.render('home', {products})
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {products})
})

router.get("/message", (req, res) => {
    res.render("messages");
});

router.post('/api/products', (req, res)=> {
    let newProduct = req.body
    productManager.addProduct(newProduct)
    res.send({ status: "Success", msg: 'El producto ha sido añadido!' })
})

router.put('api/products/:pid', (req, res)=> {
    let cambios = req.body
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (!product) {
        res.status(404).send(`Producto con id "${req.params.pid}" no encontrado`);
      } 
      else {
        for (const property in cambios) {
            if (property === "id") res.send({ status: "Error", msg: 'No se puede modificar el ID' })
            else productManager.updateProduct(req.params.pid, property, cambios[property])
        }
        res.send({ status: "Success", msg: 'Producto Actualizado!' })
      }
    
    
})

router.delete('api/products/:pid', (req, res)=> {
    const product = productManager.getProductById(parseInt(req.params.pid));
    if (!product) {
        res.status(404).send(`Producto con id "${req.params.pid}" no encontrado`);
    }
    else {
        productManager.deleteProduct(req.params.pid)
        res.send({ status: "Success", msg: 'Producto Eliminado!' })
    }
   
})



export default router;