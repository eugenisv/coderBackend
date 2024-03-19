const socket = io();

const listaProductos = document.getElementById("lista-productos");


socket.on('new-product', data => {
    console.log(data);
    const newProduct = data;
    const prodElement = document.createElement('li');
    prodElement.id = 'prod-' + newProduct.id;
    prodElement.innerHTML = `<h2>${newProduct.title}</h2>  <p>${newProduct.description}</p>  <p>Precio: ${newProduct.price}</p>`
    listaProductos.appendChild(prodElement);
})

socket.on('del-product', data => {
    const delProduct = data;
    console.log(`se elimina ${delProduct.title}, con ID prod-${delProduct.id}`)
    const prodElement = document.getElementById(`prod-${delProduct.id}`);
    listaProductos.removeChild(prodElement);
})

socket.on('update-product', data => {
    console.log(data);
    const updatedProduct = data;
    console.log(`se modifica ${updatedProduct.title}`)
    const prodElement = document.getElementById(`prod-${updatedProduct.id}`);
    console.log(prodElement)
    prodElement.innerHTML = `<h2>${updatedProduct.title}</h2>  <p>${updatedProduct.description}</p>  <p>Precio: ${updatedProduct.price}</p>`
})