import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './util.js';
import viewsRowter from './routes/views.router.js'
import { Server } from "socket.io";
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.engine('handlebars', engine());
app.set('views',__dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public/'));

//ruta TEST
// app.get('/home', (req, res) => {
//     res.render('home');
// })

// app.get('/ping', (req, res) => {
//     res.send({status: "ok"});
// })

app.use('/', viewsRowter) 
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})

// Socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    // console.log(socket);
    console.log("Nuevo cliente conectado");
})

// Mongo DB
const URL_MONGO = 'mongodb+srv://eugenisv:Lh6rbesFrHdMXrHe@cluster0.q1kvm6e.mongodb.net/ecommerce?retryWrites=true&w=majority';
const connectMongoDB = async () => {
    try {
        mongoose.connect(URL_MONGO);
        console.log('Se conectó exitosamente a MongoDB usando Mongoose');
        
    } catch (error) {
        console.error('No se pudo conectar a la base en Mongoose' + error);
        process.exit();
    }
}

connectMongoDB();
export { socketServer };

