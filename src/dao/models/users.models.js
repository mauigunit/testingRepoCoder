import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usersCollection = 'users';

import mongoosePaginate from 'mongoose-paginate-v2'

const usersSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}) 
usersSchema.plugin(mongoosePaginate);

export {usersCollection, usersSchema};