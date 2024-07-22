import mongoose from "mongoose";
import config from "./config.js";

const URL_MONGO = config.mongoUrl;

export default class MongoSingleton {
    static #instance;
    constructor() {
        this.#connectMongoDB();
    };

    static getInstance() {
        if (this.#instance) {
            console.log("Ya existe una conexión a MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectMongoDB = async () => {
        try {
            mongoose.connect(URL_MONGO);
            
            console.log('Se conectó exitosamente a MongoDB usando Mongoose');
            
        } catch (error) {
            console.error('No se pudo conectar a la base en Mongoose' + error);
            process.exit();
        }
    }
};

