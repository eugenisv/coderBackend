const socket = io();

const listaProductos = document.getElementById("lista-productos");


socket.on('new-product',  async data => {
    try {
        const newProduct = await data;
        const prodElement = document.createElement('li');
        prodElement.id = 'prod-' + newProduct._id;
        prodElement.innerHTML = `<h2>${newProduct.title}</h2>  <p>${newProduct.description}</p>  <p>Precio: ${newProduct.price}</p>`
        listaProductos.appendChild(prodElement);
    } catch (error) {
        console.error(error)
    }
    
})

socket.on('del-product', async data => {
    try {
        const delProduct = await data[0];
        console.log(`se elimina producto`, delProduct)
        const prodElement = document.getElementById(`prod-${delProduct._id}`);
        listaProductos.removeChild(prodElement);
    } catch (error) {
        console.error(error)
    }
   
})

socket.on('update-product', async data => {
    try {
        const updatedProduct = await data[0];
        console.log("se modifica", updatedProduct)
        const prodElement = document.getElementById(`prod-${updatedProduct._id}`);
        prodElement.innerHTML = `<h2>${updatedProduct.title}</h2>  <p>${updatedProduct.description}</p>  <p>Precio: ${updatedProduct.price}</p>`
    } catch (error) {
        console.error(error)
    }
   
})