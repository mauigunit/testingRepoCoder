import containerMongoDB from "../dao/indexMongooseDao.js";
import {productsCollection, productsSchema} from '../dao/models/products.models.js';

const productsModel = new containerMongoDB(productsCollection, productsSchema);

const getProdService = async (limit, page, sort) => {
    let products = await productsModel.getProducts(limit, page, sort);
    return products
}

const getProdPIDService = async (pid) => {
    let products = await productsModel.getPIDProducts(pid);
    return products
}

const createProdService = async (newProduct) => {
    let result = await productsModel.createProducts(newProduct);
    return result
}

const updateProdService = async (pid, product) => {
    let result = await productsModel.updateProducts(pid, product);
    return result
}

const deleteProdService = async (pid) => {
    let result = await productsModel.deleteProducts(pid);
    return result
}

export {getProdService, getProdPIDService, createProdService, updateProdService, deleteProdService};