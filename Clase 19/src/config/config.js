import dotenv from 'dotenv'
import program from '../process.js';
// const MongoSingleton  = require("../utils/singleton")
const { mode } = program.opts()

dotenv.config({ path: mode === 'production' ? './src/config/.env.production' : './src/config/.env.development'})

dotenv.config();

export default {
    
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}
