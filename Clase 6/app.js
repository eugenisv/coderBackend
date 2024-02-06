const PORT = 8080;
import express from 'express'
const app = express();

import ProductManager from '../Clase 4/ProductManager.js';
const productManager = new ProductManager();


app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const productos = productManager.products;
    const response = limit ? productos.slice(0, limit) : productos;
    res.json(response);

  });

  app.get('/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);
    if (!product) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.json(product);
    }
  });

app.listen(PORT, () => {
    console.log('Server running in port by express');
})

  
//TESTING

// http://localhost:8080/products
// http://localhost:8080/products?limit=5
// http://localhost:8080/products/2
// http://localhost:8080/products/34123123

