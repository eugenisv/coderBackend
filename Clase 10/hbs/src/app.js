
import express from 'express';
import __dirname from './util.js';
import handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public/'))

// app.get('/hello', (req, res) => {
//     let testUser = {
//         name: "Alan",
//         last_name: "Barcos",
//         edad: 27
//     }
//     res.render('hello', testUser)
// })

app.use('/api/hbs', viewRouter)

app.listen(PORT, ()=> {
    console.log("Listening on port 8080")
})