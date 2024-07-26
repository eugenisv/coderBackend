import { Router } from "express";
// import ProductManager from "../dao/ProductManager.js";  // FileSystem
//import { socketServer } from "../app.js"; YA NO SE USA
import { productModel } from "../services/db/models/product.model.js";
import {getProductsParams, getProductById, createNewProduct, updateProduct, deleteProduct} from '../controllers/products.controller.js';

const router = Router();

//ROUTER MONGO
router.get('/', getProductsParams);
router.get('/:pid', getProductById);
router.post('/', createNewProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

// router.get('/categories/:category', getProductsByCategory)
// router.get('/:pid', getSortedProductsByPrice)
//PUEDE NO SER NECESARIO SOLO CON GETPRODUCTSPARAMS Y UNA BUENA IMPLEMENTACION EN LINKS

//FUNCIONES

export async function getProducts () { //EN EL PRODUCT MANAGER, NO SE USA ACA
    try {
        const products = await productModel.find().lean();
        return products;
    } catch (error) {
        console.error('No se puede obtener los productos con Mongoose en getProducts()', error);
    }
}

// EN EL VIEWS ROUTER Y ACA
// export async function getProductsParams (qlimit, qqpage, qsort, qquery) {
//     try {
//         // valores por default
//         const dlimit = 3;
//         const dpage = 1;
//         // asignación de valores
//         const limit = qlimit ? parseInt(qlimit) : dlimit;
//         const qpage = qqpage ? parseInt(qqpage) : dpage;
//         const sort = qsort? {price: qsort} : {};
//         const query = qquery ? {category : qquery} : {};
//         let productos = await productModel.paginate(query,{limit : limit, page: qpage, sort : sort, lean : true})
//         const {docs, totalPages, page,  hasPrevPage, hasNextPage, prevPage, nextPage} = productos
//         const response = {
//                             status : 'success', 
//                             payload : docs, 
//                             totalPages : totalPages, 
//                             prevPage : prevPage, 
//                             nextPage : nextPage,
//                             page : page,
//                             hasPrevPage : hasPrevPage,
//                             hasNextPage : hasNextPage,
//                         };
//         // res.json(response);
//        return response;
//     } catch (error) {
//         console.error('No se pudo obtener los productos desde Mongoose' + error)
//         res.status(500).send({'status': 'No se pudo obtener la base de datos de Productos en Mongoose', 'message' : error})

//     }
// }

export default router;

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




