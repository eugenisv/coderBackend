class ProductManager { // gestiona un conjunto de productos
    constructor() {
        this.products = []
    }
    addProduct (product) {
        // valida que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios")
          }
        // valida que no se repita el campo code
        if (this.products.some((p) => p.code === product.code)) {
            console.error('Ya existe un producto con ese código')
          }
       else {
        // Debe crearse con in id autoincrementable
        product.id = this.products.length
        // agrega un producto al arreglo de productos inicial
        this.products.push(product)
       }
    }
    
    getProducts () { // devolver el arreglo con todos los productos creados hasta el momento
        return (this.products)

    }

    getProductById (idProduct) {
        // Busca en el arreglo el producto que coincida con el id
        // si no coincide, mostrar en consola un error "Not found"
        const found = this.products.find((p) => p.id === idProduct)
        found ? console.log(this.products[idProduct]) : console.error("Not found")
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

//TESTING
const productManager = new ProductManager()
console.log(productManager.getProducts())

productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnail: 'Sin imagen' , code: 'abc123', stock:25})
console.log(productManager.getProducts())

productManager.addProduct({title : 'producto prueba', description: 'Este es un producto prueba', price:200, thumbnail: 'Sin imagen' , code: 'abc123', stock:25})

productManager.getProductById(0)
productManager.getProductById(1)