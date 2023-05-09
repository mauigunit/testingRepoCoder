import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const cartsCollection = 'carts';

import mongoosePaginate from 'mongoose-paginate-v2'

const cartsSchema = mongoose.Schema({
    products: { type: [
        {
            product: { type: Schema.Types.ObjectId, required: true, ref: "products" },
            quantity: { type: Number, required: true }
        }
    ], required: false, default: [] }
})

cartsSchema.plugin(mongoosePaginate);

export {cartsCollection, cartsSchema};