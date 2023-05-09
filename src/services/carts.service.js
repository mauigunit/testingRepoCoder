import containerMongoDB from "../dao/indexMongooseDao.js";
import {cartsCollection, cartsSchema} from '../dao/models/carts.models.js';

const cartsModel = new containerMongoDB(cartsCollection, cartsSchema);

const getCartsService = async (cid) => {
    let cart = await cartsModel.getCart(cid);
    return cart
}

const getCartsDetailsService = async (cid) => {
    let cart = await cartsModel.getCartDetails(cid);
    return cart
}

const createCartsService = async () => {
    let cid = await cartsModel.createCart();
    return cid
}

const addProdCartsService = async (cid, pid, quantity) => {
    let result = await cartsModel.addProdCart(cid, pid, quantity);
    return result
}

const searchProdCartsService = async (cid) => {
    let result = await cartsModel.searchProdCart(cid, uid);
    return result
}

const updateProdCartsService = async (cid, cart) => {
    let result = await cartsModel.updateCart(cid, cart);
    return result
}

const deleteProdCartsService = async (cid) => {
    let result = await cartsModel.deleteProductsCart(cid);
    return result
}

export {getCartsService, createCartsService, addProdCartsService, searchProdCartsService, updateProdCartsService, deleteProdCartsService, getCartsDetailsService};