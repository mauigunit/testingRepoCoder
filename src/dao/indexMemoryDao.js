import { v4 as uuidv4 } from 'uuid';

let carts = [];
let products = [];

class containerMemoryDB {

    async getProducts() {
        return products;
    }

    async getPIDProducts(pid) {
        let result = await products.find({ _id: pid });
        return result;
    }

    async createProducts(newProduct) {
        newProduct._id = uuidv4();
        let result = await products.push(newProduct);
        return result;
    }

    async updateProducts(pid, product) {
        let indexArray = await products.findIndex(prod => prod._id === pid);
        if (indexArray === -1) {
            throw new Error('No se encontro el producto indicado.');
        } else {
            products[indexArray] = product;
            return products[indexArray];
        }
    }

    async deleteProducts(pid) {
        let indexArray = await products.findIndex(prod => prod._id === pid);
        if (indexArray === -1) {
            throw new Error('No se encontro el producto indicado.');
        } else {
            products.splice(indexArray, 1);
            return {eliminado: 1};
        }
    }

}

export default containerMemoryDB;