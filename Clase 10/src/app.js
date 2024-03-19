import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './util.js';
import viewsRowter from './routes/views.router.js'
import { Server } from "socket.io";


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


export { socketServer };

