import fs from 'fs';
// crear directorio y archivo donde se guardará la info
const dirName = './files' 
const fileName = dirName + '/carrito.json'
if(!fs.existsSync(dirName)) fs.mkdirSync(dirName)

class Cart {
    constructor() {
        this.products = []
    }
}

class CartManager { // gestiona un conjunto de productos
    constructor() {
        this.carts = [] 
        this.path = fileName 
    }
    addCart () {
        this.updateLocal()
       // Debe crearse con in id autoincrementable
        const cart = new Cart;
        cart.id = this.carts.length
        // agrega un carrito al arreglo de carritos inicial
        this.carts.push(cart)
        this.updateFile() 
        console.log(this.carts)
       }

    getCartById (cid) {
        // recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
        this.updateLocal()
        const found = this.carts.find((p) => p.id === cid)
        // si no coincide, mostrar en consola un error
        found ? console.log(this.carts[cid]) : console.error('No existe un carrito con dicho ID')
        
        return this.carts[cid]
    
    }

    addProdinCart(cid, pid) {
        const carrito = this.getCartById(cid)

        if (carrito) {
            const productos = carrito.products
            const encontrado = productos.find(producto => producto.product === pid)

            if (encontrado) {
                encontrado.quantity++;
            }
            else {
                let newProduct = {}
                newProduct.product = pid;
                newProduct.quantity = 1
                productos.push(newProduct)
            }
            this.updateFile()
        }
        else console.error(`No existe carrito con id ${cid}`)
        

    }
   


    updateFile() {fs.writeFileSync(this.path, JSON.stringify(this.carts))}

    updateLocal() {
        if(fs.existsSync(this.path)) this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        else fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

}

export default CartManager;


