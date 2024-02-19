import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();


// crear productos (Base de datos)

const productManager = new ProductManager
// productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnails: 'Sin imagen' , code: 'abc123', stock:25, category: "mula"})

// productManager.addProduct({title : 'producto prueba2', description: 'Este es un producto prueba2', price:200, thumbnails: 'Sin imagen' , code: '123', stock:5, category: "mula"})


router.get('/', (req, res) => {
    const limit = req.query.limit;
    const productos = productManager.getProducts();
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
    res.send({ status: "Success", msg: 'El producto ha sido añadido!' })
})

router.put('/:pid', (req, res)=> {
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

router.delete('/:pid', (req, res)=> {
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
