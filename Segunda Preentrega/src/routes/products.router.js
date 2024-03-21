import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { socketServer } from "../app.js";
import { productModel } from "../models/product.model.js";

const router = Router();


// crear productos (Base de datos)

const productManager = new ProductManager
// productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnails: 'Sin imagen' , code: 'abc123', stock:25, category: "mula"})

// productManager.addProduct({title : 'producto prueba2', description: 'Este es un producto prueba2', price:200, thumbnails: 'Sin imagen' , code: '123', stock:5, category: "mula"})

//ROUTER MONGO
router.get('/', async (req, res) => {
    try {
        let productos = await productModel.find()
        const limit = req.query.limit;
        const response = limit ? productos.slice(0, limit) : productos;
        res.json(response);
    } catch (error) {
        console.error('No se pudo obtener los productos desde Mongoose' + error)
        res.status(500).send({error: 'No se pudo obtener la base de datos de Productos en Mongoose', message: error})

    }
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

//MONGO DB
router.post('/', async (req, res)=> {
    try {
        let newProduct = req.body
        let products = await productModel.create(newProduct)
        res.send({ status: "Success", msg: 'El producto ha sido añadido!', payload: products})
        socketServer.emit('new-product', newProduct);
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose' + error })

    }
})

//Mongo DB
router.put('/:pid', async (req, res)=> {
    try {
        let cambios = req.body
        const product = await productModel.updateOne({_id: req.params.pid}, cambios);
        const added = product.acknowledged !== false;
        if (!added)  res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose ' + JSON.stringify(product)})
        else {
            res.send({ status: "Success", msg: 'Producto Actualizado!', payload : product })
            socketServer.emit('update-product', product)
        }
       
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose ' + error })
    }
    
})

router.delete('/:pid', async (req, res)=> {
    try {
        const delproduct = await productModel.deleteOne({_id: req.params.pid});
        res.send({ status: "Success", msg: 'Producto Eliminado!', payload : delproduct });
        //socketServer.emit('delProduct', product)
    }   catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido eliminado con Mongoose ' + error });
    }
})

//ROUTER ORIGINAL
    // router.get('/', (req, res) => {
    //     const limit = req.query.limit;
    //     const productos = productManager.getProducts();
    //     const response = limit ? productos.slice(0, limit) : productos;
    //     res.json(products);
    // })
//CODIGO VIEJO
// router.post('/', (req, res)=> {
//     let newProduct = req.body
//     const added = productManager.addProduct(newProduct)
//     if (added) {
//         res.send({ status: "Success", msg: 'El producto ha sido añadido!' })
//         socketServer.emit('new-product', newProduct);
//     }
//     else {
//         res.send({ status: "Failure", msg: 'El producto NO ha sido añadido.' })
//     }
// })
//CODIGO VIEJO
// router.put('/:pid', (req, res)=> {
//     let cambios = req.body
//     const product = productManager.getProductById(parseInt(req.params.pid));
//     if (!product) {
//         res.status(404).send(`Producto con id "${req.params.pid}" no encontrado`);
//       } 
//       else {
//         for (const property in cambios) {
//             if (property === "id") res.send({ status: "Error", msg: 'No se puede modificar el ID' })
//             else productManager.updateProduct(req.params.pid, property, cambios[property])
//         }
//         res.send({ status: "Success", msg: 'Producto Actualizado!' })
//         socketServer.emit('update-product', productManager.getProductById(parseInt(req.params.pid)))
//       }
// })
// CODIGO VIEJO
// router.delete('/:pid', (req, res)=> {
//     const product = productManager.getProductById(parseInt(req.params.pid));
//     if (!product) {
//         res.status(404).send(`Producto con id "${req.params.pid}" no encontrado`);
//     }
//     else {
//         productManager.deleteProduct(req.params.pid)
//         res.send({ status: "Success", msg: 'Producto Eliminado!' })
//         socketServer.emit('del-product', product)
//     }
   
// })


export default router;
