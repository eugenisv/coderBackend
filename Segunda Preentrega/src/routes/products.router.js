import { Router } from "express";
// import ProductManager from "../dao/ProductManager.js";  // FileSystem
import { socketServer } from "../app.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();

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

router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.find({_id : {$eq: pid}});
        console.log(product)
        if (product.acknowledged !== false)   {
            res.json(product);
        }
        else  res.status(404).send({status: "failure", message: 'Producto no encontrado', payload: product});
    } catch (error) {
        console.error('No se pudo obtener producto con ID')
        res.status(404).send({status: "failure", message: 'No se pudo obtener la base de datos con Mongoose' + error});
    }
});

router.post('/', async (req, res)=> {
    try {
        let newProduct = req.body
        const products = await productModel.create(newProduct)
        res.send({ status: "Success", msg: 'El producto ha sido añadido!', payload: products})
        socketServer.emit('new-product', products);
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoos '+ error, "error":  error })

    }
})

router.put('/:pid', async (req, res)=> {
    try {
        let cambios = req.body
        const confirm = await productModel.updateOne({_id: req.params.pid}, cambios);
        const added = confirm.acknowledged !== false;
        if (!added)  res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose ' + JSON.stringify(confirm)})
        else {
            const updatedProduct = await productModel.find({_id: {$eq: req.params.pid}}).lean()
            res.send({ status: "Success", msg: 'Producto Actualizado!', payload : updatedProduct });
            socketServer.emit('update-product', updatedProduct)
        }
       
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose ' + error })
    }
    
})

router.delete('/:pid', async (req, res)=> {
    try {
        const delProduct = await productModel.find({_id: {$eq: req.params.pid}}).lean();
        const confirm = await productModel.deleteOne({_id: req.params.pid});
        console.log(delProduct, typeof(delProduct))
        res.send({ status: "Success", msg: 'Producto Eliminado!', deleted : delProduct, payload: confirm});
        socketServer.emit('del-product', delProduct)
    }   catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido eliminado con Mongoose ' + error });
    }
})

//ROUTER ORIGINAL FILESYSTEM
// const productManager = new ProductManager

//     router.get('/', (req, res) => {
//         const limit = req.query.limit;
//         const products = productManager.getProducts();
//         const response = limit ? products.slice(0, limit) : products;
//         res.json(products);
//     })
// router.get('/:pid', (req, res) => {
//     const pid = parseInt(req.params.pid);
//     const product = productManager.getProductById(pid);
//     if (!product) {
//       res.status(404).send('Producto no encontrado');
//     } else {
//       res.json(product);
//     }
// });
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
