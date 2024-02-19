import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();


// crear productos (Base de datos)

const productManager = new ProductManager
// productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnail: 'Sin imagen' , code: 'abc123', stock:25})

// productManager.addProduct({title : 'producto prueba2', description: 'Este es un producto prueba2', price:200, thumbnail: 'Sin imagen' , code: '123', stock:5})


router.get('/', (req, res) => {
    const limit = req.query.limit;
    const productos = productManager.products;
    const response = limit ? productos.slice(0, limit) : productos;
    res.json(response);
})

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);
    if (!product) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json(product);
    }
});

router.post('/', (req, res)=> {
    let newProduct = req.body
    productManager.addProduct(newProduct)
    res.send({ status: "Success", msg: 'Producto Actualizado!' })

    
})

router.put('/:pid', (req, res)=> {
    let cambios = req.body
    for (const property in cambios) {
        productManager.updateProduct(req.params.pid, property, cambios[property])
    }
    res.send({ status: "Success", msg: 'Producto Actualizado!' })
    
})

router.delete('/:pid', (req, res)=> {
    productManager.deleteProduct(req.params.pid)
    res.send({ status: "Success", msg: 'Producto Eliminado!' })
})


export default router;
