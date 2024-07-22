import mongoose, { mongo } from "mongoose";

const messagesCollection = 'messages';
const messageSchema = {
    user: String, 
    message: String
}

export const messagesModel = mongoose.model(messagesCollection, messageSchema);