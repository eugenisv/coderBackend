import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';
const stringSchemaRequired = {
    type : String,
    required : true
}

const numberSchemaRequired = {
    type : Number,
    required : true
}

const productSchema = new mongoose.Schema({
    title: stringSchemaRequired,
    price: numberSchemaRequired,
    code : {
        type: String,
        unique: true, 
        required : true
    },
    stock: numberSchemaRequired,
    description : stringSchemaRequired,
    thumbnails: stringSchemaRequired,
    category: {
        type : String,
        required : true,
        enum : ["exterior", "mesas", "camastros", "complementos", "bibliotecas", "consolas y recibidores", "sin categoría"],
        default: "sin categoría",
        index : true
    },
    status : Boolean
})
mongoosePaginate
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema)