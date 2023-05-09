const fs = require('fs');

class productsManager {

    pathFile;

    constructor() {
        this.pathFile = __dirname + '/../data/products.json';
    }

    async getProductsData() {
        let data = await fs.promises.readFile(this.pathFile, 'utf-8');
        return JSON.parse(data);
    }

    async getProducts(limit) {
        let products = await this.getProductsData();
        if (limit) {
            return products.slice(0, limit);
        } else {
            return products;
        }
    }

    async getProductByUid(uid) {
        let products = await this.getProductsData();
        let search = products.find(elem => elem.uid == uid);
        return search;
    }

    async addNewProduct(title, description, code, price, stock, category, thumbnails) {
        let products =  await this.getProductsData();
        let maxUid = Math.max(...products.map(uid => uid.uid));
        if (maxUid === -Infinity) { maxUid = 1; }
        else { maxUid++ }
        let status = true;
        let newProduct = { uid : maxUid, title, description, code, price, status, stock, category, thumbnails : [thumbnails] }
        products.push(newProduct);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(products));
        return true;
    }

    async putProduct (uid, title, description, code, price, status, stock, category, thumbnails) {
        let products =  await this.getProductsData();
        let indexArray = products.findIndex(uidP => uidP.uid === uid);
        if (indexArray === -1) {
            return -1;
        } else {
            products[indexArray] = { uid, title, description, code, price, status, stock, category, thumbnails };
            await fs.promises.writeFile(this.pathFile, JSON.stringify(products));
            return 1;
        }
    }

    async deleteProduct (uid) {
        let products =  await this.getProductsData();
        let indexArray = products.findIndex(uidP => uidP.uid === uid);
        if (indexArray === -1) {
            return -1;
        } else {
            products.splice(indexArray, 1);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(products));
            return 1;
        }
    }
}

module.exports = productsManager;