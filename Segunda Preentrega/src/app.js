import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './util.js';
import viewsRowter from './routes/views.router.js'
import { Server } from "socket.io";
import mongoose from 'mongoose';
import { messagesModel } from './dao/models/messages.model.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.engine('handlebars', engine());
app.set('views',__dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public/'));

app.use('/', viewsRowter) 
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})

// Socket.io
const findMessages = async () => {
    const mensajes = await messagesModel.find();
    return mensajes;
}
const socketServer = new Server(httpServer);

socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado");
    socket.on('message', async data => {
        try {
            const newMessage =  await messagesModel.create(data);
            const mongomessages = await findMessages();
            socketServer.emit('messagelog', mongomessages);
        } catch (error) {
            console.error('Error al obtener mensajes de mongoose' + error);
        }
   
    })

    socket.on('userConection', async data => {
        try {
            const messages = await findMessages();
            socketServer.emit('messagelog', messages);
            console.log('Nuevo cliente conectado a la aplicación de Chat');
            socket.broadcast.emit('alertConection', data);
        } catch (error) {
            console.error('Error al obtener mensajes de Mongoose' + error);
        }
        
    })

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

