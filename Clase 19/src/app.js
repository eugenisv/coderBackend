import express from 'express';
import {engine} from 'express-handlebars';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';

//Routers 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRowter from './routes/views.router.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js';

import __dirname from './util.js';

import { Server } from "socket.io";
import { messagesModel } from './dao/models/messages.model.js';

import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';


// PASSPORT
import passport from 'passport';
import initializePassport from './config/passport.config.js';


const app = express();
const PORT = config.port;
const URL_MONGO = config.mongoUrl;


app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser('RJ4vg/@ctuB2W2&'))


app.engine('handlebars', engine());
app.set('views',__dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public/'));


const fileStorage = FileStore(session);

app.use(session({
    store: MongoStore.create({
        mongoUrl: URL_MONGO,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 600
    }),
    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true, // Estaba en true
}));

// PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRowter) 
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/users', usersViewRouter);
app.use('/api/sessions', sessionsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
    console.log(process.argv);
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

// SINGLETON

const mongoInstance =  async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log(error);
    }
}
mongoInstance();

// Mongo DB
// const connectMongoDB = async () => {
//     try {
//         mongoose.connect(URL_MONGO);
//         console.log('Se conectó exitosamente a MongoDB usando Mongoose');
        
//     } catch (error) {
//         console.error('No se pudo conectar a la base en Mongoose' + error);
//         process.exit();
//     }
// }

//connectMongoDB();
export { socketServer };

