import express from 'express';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
const PORT = 8080;

app.get('/ping', (req, res) => {
    res.send({status: "ok"})
})

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);;
})