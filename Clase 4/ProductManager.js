const { ifError } = require('assert')
const { error } = require('console')
const fs = require('fs')
// crear directorio y archivo donde se guardará la info
const dirName = './files' 
const fileName = dirName + '/ejemplo.json'
if(!fs.existsSync(dirName)) fs.mkdirSync(dirName)

class ProductManager { // gestiona un conjunto de productos
    constructor() {
        this.products = []
        this.path = fileName //debe recibir la ruta a trabajar desde el momento de generar su instancia.
    }
    addProduct(product)  {

        this.updateLocal()
        // valida que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios")
          }
        // valida que no se repita el campo code
        if (this.products.some((p) => p.code === product.code)) {
            console.error('Ya existe un producto con ese código')
          }
       else { // Debe crearse con in id autoincrementable
        product.id = this.products.length
        // agrega un producto al arreglo de productos inicial
        this.products.push(product)
        this.updateFile()
       }
    }
    
    getProducts () { 
        // debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
        this.updateLocal()
        return (this.products)
    }

    getProductById (idProduct) {
        // recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
        this.updateLocal()
        const found = this.products.find((p) => p.id === idProduct)
        // si no coincide, mostrar en consola un error
        found ? console.log(this.products[idProduct]) : console.error('No existe un producto con dicho ID')
        
        return this.products[idProduct]
    
    }

    updateProduct (idProduct, propertyProduct, newValue) {
        // recibir el id del producto a actualizar, así también como el campo a actualizar y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
        this.updateLocal()
        let product = this.getProductById(idProduct)
        if( product && product[propertyProduct]) 
        {
            product[propertyProduct] = newValue
            this.updateFile()
            console.log('Producto actualizado')
        }
        else console.error(`El producto no posee propiedad "${propertyProduct}"`)
    }

    deleteProduct (idProduct) {
        this.updateLocal()
        let delProduct = this.getProductById(idProduct)
        if(delProduct) 
        {
            this.products.splice(idProduct, 1)
            this.updateFile()
            console.log('Producto eliminado')
        }
        else console.error('No existe un producto con dicho ID')
    }

    updateFile = async() => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), (error) => {
                if (error) throw Error('No se puede escribir archivo en updateFile')
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateLocal = async() => {
        try {
            if(fs.existsSync(this.path)) {
                await fs.promises.readFile(this.path, 'utf-8', (error, contenido) => {
                    if (error) throw Error('Error al leer archivo en updateLocal')
                    this.products =  JSON.parse(contenido)
                })
            }
            else {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products), (error) => {
                    if (error) throw Error('Error al escribir archivo en updateLocal')
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

module.exports = ProductManager;

//TESTING
// const productManager = new ProductManager()
// console.log("1",productManager.getProducts())
// productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnail: 'Sin imagen' , code: 'abc123', stock:25})
// console.log("2",productManager.getProducts())
// console.log('3')
// productManager.getProductById(0)
// console.log('4')
// productManager.getProductById(1)
// console.log('5')
// productManager.addProduct({title : 'producto prueba2', description: 'Este es un producto prueba2', price:200, thumbnail: 'Sin imagen' , code: '123', stock:5})
// console.log('6')
// productManager.updateProduct(0, 'code', 'NUEVO CÓDIGO')
// console.log("6.5",productManager.getProducts())
// console.log('7')
// productManager.deleteProduct(1)


