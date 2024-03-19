import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js'
import { Server } from 'socket.io'



const app = express();
const PORT = 9090;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"))

app.use('/', viewRouter)


const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

// Instanciamos socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    // console.log(socket);
    console.log("Nuevo cliente conectado");

    // Escuchamos al cliente
    //  socket.on('msgKEY', data => {
    //      console.log(data);
    //  })

    socket.emit('msg_02', "Mensaje enviado desde el BACKEND!!")

    // socket.broadcast.emit('msg_03', "Este evento es para todos los sockets, menos el socket desde que se emitió el mensaje!")

    // socketServer.emit('msg_04', "Mensaje enviado desde el BACKEND!! para todos")


    // Ejertcico 02
    //Message2 se utiliza para la parte de almacenar y devolver los logs completos
})




