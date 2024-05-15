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
    password: String
})

const userModel = mongoose.model(usersCollection, schema)

export default userModel;