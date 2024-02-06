// HTTP

// const http = require('http')
const PORT = 8080;
import express from 'express'
const app = express();

// const server = http.createServer((request, response)=> {
//     response.end('Hola, Backend')
// })

// server.listen(PORT,()=>{
//     console.log('Listening on port 8070')
// })

// Desde el cliente
// http://localhost:8080

// EXPRESS
//base de datos simulada
const usuarios = [
    {id: 1, nombre: 'Juan1', apellido: 'Torres', edad: 'X', genero: 'M'},
    {id: 2, nombre: 'Juan2', apellido: 'Torres', edad: 'X', genero: 'M'},
    {id: 3, nombre: 'Juan3', apellido: 'Torres', edad: 'X', genero: 'M'},
    {id: 4, nombre: 'Juan4', apellido: 'Torres', edad: 'X', genero: 'M'}
]

// Path O endpoint de entrada desde el navegador
app.get('/saludo', (rec, res) =>
    res.send('Hola express')
)

// Usando req.params
// app.get('/user/:nombre/:apellido', (rec, res) => {
//     console.log(rec.params)
//     res.send(`Hola, ${rec.params.nombre}. \nEstás siendo observada, ${rec.params.apellido} con express.`)
// })

app.get('/userall', (rec, res) => {
    res.send(usuarios)
})


app.get('/userid/:userId', (rec, res) => {
    //primera forma
    let {userId} = rec.params
    // segunda forma
    let userId_02 = rec.params.userId
    const usuario = usuarios.find(u => u.id === parseInt(userId))
    if(usuario) {
        res.json({usuario})
    }
    res.send({msg: 'User not found'})
})
app.listen(PORT, () => {
    console.log('Server running in port by express');
})


