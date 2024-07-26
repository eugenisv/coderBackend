import CartService from "../services/db/dao/carts.dao.js";

const cartService = new CartService();
export async function createNewCart(req, res) {
    try {
        const newCart = await cartService.createCart();
        res.send({ status: "Success", msg: 'Carrito creado', payload: newCart})
    } catch (error) {
        res.status(500).send({status: 'failure', message: 'No se ha podido crear carrito ' + error})
    }
} 

export async function getCartById(req, res) {
    try {
        const cart = await cartService.getById(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).send({status: 'failure', message: 'Carrito no encontrado', payload: error});
    }
    
} 

export async function updateCart (req, res) {
    try {
        const cart = await cartService.update(req.params.cid, req.body);
    if (!cart) return res.status(404).send({ status: 'failure', message: 'Carrito no encontrado' });
    res.send({ status: 'success', message: 'Carrito actualizado', payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'Failure', message: 'Error al actualizar el carrito ' + error});
    }
}

export async function addProductToCart (req, res) {
    try {
        const cart = await cartService.addProduct(req.params.cid, req.params.pid)
        res.send({status:'success', message: 'Producto Añadido al carrito', payload: cart})
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al conectarse con el servicio ' + error})
    }
  
} 

export async function productQuantityCart (req, res) {
    try {
        const newQuantity = req.body.quantity;
        if (isNaN(newQuantity)) return res.status(400).send({ status: 'failure', message: 'Cantidad no válida, debe ser un número entero' });
        const cart = await cartService.changeProductQuantity(req.params.cid, req.params.pid, newQuantity)
        res.send({status:'success', message: 'Cantidad de Producto actualizada', payload: cart})
    } catch (error) {
        console.error(error);
        res.status(500).send({status: "failure", message: 'Hubo un error al conectarse con el servicio ' + error})
    }
  
} 

export async function deleteProductFromCart (req, res) {
    try {
        const index = await cartService.deleteProduct(req.params.cid, req.params.pid);
        if (index !== -1) {
            res.send({status:'success', message: 'Producto Eliminado del Carrito'})
        }
        else {
            res.send({status:'error', message: 'No existe el producto en el carrito'})
        } 
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito o producto por ID ' + error})
    }
} 

export async function deleteCart (req, res) {
    try {
        const status = await cartService.delete(req.params.cid);
        if(status)  res.send({status:'success', message: 'El carrito está vacío'});
        else res.send({status:'error', message: 'No se ha encontrado el carrito'});
    } catch (error) {
        res.status(500).send({status: "failure", message: 'Hubo un error al obtener carrito y eliminar sus productos ' + error})
    }
} 
