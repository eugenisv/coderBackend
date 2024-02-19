import fs from 'fs';
// crear directorio y archivo donde se guardará la info
const dirName = './src/files' 
const fileName = dirName + '/productos.json'
if(!fs.existsSync(dirName)) fs.mkdirSync(dirName)

class ProductManager { // gestiona un conjunto de productos
    constructor() {
        this.products = []
        this.path = fileName //debe recibir la ruta a trabajar desde el momento de generar su instancia.
    }
    addProduct (product) {
        this.updateLocal()
        // valida que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            console.error("Todos los campos excepto thumbnails son obligatorios")
          }
        // valida que no se repita el campo code
        if (this.products.some((p) => p.code === product.code)) {
            console.error('Ya existe un producto con ese código')
          }
        else { // Debe crearse con in id autoincrementable
            product.id = this.products.length
            if(!product.status) product.status = true
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

    updateFile() {fs.writeFileSync(this.path, JSON.stringify(this.products))}

    updateLocal() {
        if(fs.existsSync(this.path)) this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        else fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

}

class Product {
    constructor(title, description, price, thumbnails, code, stock, category) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnails = thumbnails
        this.code = code
        this.stock = stock
        this.status = true
        this.category = category
    }
}

export default ProductManager;
