import ProductService from "../services/db/products.dao.js";
import { socketServer } from "../app.js";

const productService = new ProductService();

export const getProductsParams = async (req, res)=> {  
    try {
         const products = await productService.getAll(req);
         res.send({message : "Success!", payload: products});
      
        } catch (error) {
        console.log("Problema al conectarse con el servicio de Producto")
        res.status(500).send({error : error});
    }
} 
export const getProducts = async (req, res)=> {

} 

export const getProductById = async (req, res)=> {
    try {
        const product = await productService.getById(req.params.pid);
        if (product)   {
            res.json(product);
        } 
        else  res.status(404).send({status: "failure", message: 'Producto no encontrado', payload: product});
    } catch (error) {
        console.error('Error al utilizar el servicio ' + error)
        res.status(404).send({status: "failure", message: 'Eror al conectarse con el product service para obtener producto por ID ' + error});
    }
} 

export const createNewProduct = async (req, res)=> {
    try {
        const newProduct = await productService.createProduct(req.body);
        if(newProduct)  res.send({ status: "Success", msg: 'El producto ha sido añadido!', payload: newProduct})
        else res.send({ status: "Error", msg: 'Ya existe un producto con el mismo código, o uno de los campos no está debidamente llenado'})
        socketServer.emit('new-product', newProduct);
    } catch (error) {
        console.error('Problema al conectarse con el servicio ' + error);
        res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose'+ error, "error":  error })
    }
} 

export const updateProduct = async (req, res)=> {
    try {
        const changes = req.body;
        const pid = req.params.pid;
        const response = await productService.updateProduct(pid, changes);
            if (!response.added)  res.send({ status: "Failure", msg: 'El producto NO ha sido añadido a Mongoose ' + JSON.stringify(response.confirm)})
            else {
                res.send({ status: "Success", msg: 'Producto Actualizado!', payload : response.updatedProduct });
                socketServer.emit('update-product', response.updatedProduct)
            }
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido actualizado ' + error })
    }
   

} 

export const deleteProduct = async (req, res)=> {
    try {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(pid);
        socketServer.emit('del-product', result.delProduct)
        res.send({ status: "Success", msg: 'Producto Eliminado!', deleted : result.delProduct, payload: result.confirm});
    
    } catch (error) {
        res.send({ status: "Failure", msg: 'El producto NO ha sido, problema generado en la conexión con el servicio: ' + error });
    }
    

} 

