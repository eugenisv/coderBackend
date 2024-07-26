import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../util.js';

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                const exists = await userModel.findOne({ email })
                if (exists) {
                    console.log("Ya existe el usuario.");
                    return done(null, false);
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                const result = await userModel.create(newUser);
                return done(null, result)

            } catch (error) {
                return done("Error obteniendo al usuario" + error);
            }
        }
    ))

    passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.log("No existe el usuario: " + username);
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.log("Email o contraseña incorrectas: " + username);
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);  
        } catch (error) {
            console.log("error al deserializar el usuario: " + error);
        }
        
    })
}
export default initializePassport;