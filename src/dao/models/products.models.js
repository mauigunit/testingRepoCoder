import mongoose from 'mongoose';
const productsCollection = 'products';

import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: false, default: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: []
})

productsSchema.plugin(mongoosePaginate);

export {productsCollection, productsSchema};