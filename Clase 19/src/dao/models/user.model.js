import mongoose from "mongoose";

const usersCollection = 'users';

const schema = new mongoose.Schema({
    first_name : String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    rol: {
        type: String,
        default: 'user' 
      },
    password: String
})

// Codigo usado para crear el rol de admin
// schema.pre('save', async function (next) {
//     if (this.isNew && this.rol !== 'admin') {
//       const existingAdmin = await userModel.findOne({ rol: 'admin' });
//       if (!existingAdmin) {
//         this.rol = 'admin'; 
//       }
//     }
//     next(); 
//   });

const userModel = mongoose.model(usersCollection, schema)

export default userModel;