import { Router } from "express";
// import userModel from "../dao/models/user.model.js";
// import { isValidPassword } from "../util.js";
import passport from "passport";

const router = Router();


// PASSPORT

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}), async(req, res) => {
    console.log("Creando nuevo usuario");
    res.status(200).send({status: "success", message: "Usuario registrado exitosamente"});
})

router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).send({ status: "error", error: "Usuario o contraseña incorrectos" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "Usuario logueado exitosamente" });
});

router.get('/failregister', (req, res) => {
    console.log("Registro fallido");
    res.status(401).send({error: "Registro fallido"});
})

router.get("/faillogin", (req, res) => {
    res.status(401).send({ error: "Login fallido" });
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({error: 'error logout', message: 'Error al cerrar la sesión'});
        }
        res.send('Sesión cerrada correctamente.')
    })
})

export default router;

// ANTES DE PASSPORT
// router.post('/register', async (req, res) => {
//     try {
//         const {first_name, last_name, email, age, password} = req.body;
//         if (!first_name || !last_name || !email || !age || !password) return res.status(400).send({ status: 'error', message: 'No se han completado todos los campos'})
//         console.log('Registrando Usuario');
//         console.log(req.body);

//         const exists = await userModel.findOne({ email })
//         if (exists) {
//             return res.status(402).send({ status: 'error', message: 'Usuario ya existe con ese mail'})
//         }

//         const user = {
//             first_name, 
//             last_name,
//             email,
//             age,
//             password: createHash(password)
//         }

//         const result = await userModel.create(user);

//         res.send({status: 'success', message: 'Usuario creado con exito con ID: ' + result.id} );
//     } catch (error) {
        
//     }
  

// })


// router.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     if(!email || !password) return res.status(400).send({status: "error", error: "No se han llenado todos los campos"});
//     const user = await userModel.findOne({email: email}, {email: 1, first_name: 1, last_name: 1, password: 1});
//     if (!user) return res.status(401).send({status: 'error', error: 'Credenciales incorrectas'});
//     if(!isValidPassword(user, password)) return res.status(403).send({status: "error", error: "Email o contraseña"})
//     req.session.user = {
//         name:  `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//     }
//     // ROL ADMIN
//     // if (username == '' && password == ''){
//     //     req.session.admin = true;
//     // }

//     res.send({ status: 'success', payload: req.session.user, message: 'Logeado realizado'})
// })
