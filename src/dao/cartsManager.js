const fs = require('fs');
const products = require('../utils/productsManager');
ClassProducts = new products();

class cartsManager {

    pathFile;

    constructor() {
        this.pathFile = __dirname + '/../data/carts.json';
    }

    async getCartsData() {
        let data = await fs.promises.readFile(this.pathFile, 'utf-8');
        return JSON.parse(data);
    }

    async getProductsData(id) {
        let data = await ClassProducts.getProductByUid(id);
        return data;
    }

    async getCartById(id) {
        let carts = await this.getCartsData();
        let search = carts.find(elem => elem.id == id);
        return search;
    }

    async getNewIdData() {
        let carts = await this.getCartsData();
        let maxId = Math.max(...carts.map(id => id.id));
        if (maxId === -Infinity) 
        { 
            return 1; 
        }
        else { 
            maxId++; 
            return maxId
        }
    }

    async addNewCart() {
        let id =  await this.getNewIdData();
        let newCart = { id : id, products : [] }
        let carts = await this.getCartsData();
        carts.push(newCart);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(carts));
        return id;
    }

    async addProductCart(idCart, idProd) {
        let carts = await this.getCartsData();
        let indexCart = carts.findIndex(elem => elem.id === idCart);
        if(indexCart === -1) { return -1 } // CARRITO NO EXISTE
        else {
            let product = await ClassProducts.getProductByUid(idProd);
            if(product) {
                if(product.stock > 0) {
                    let { id, products } = carts[indexCart];
                    let indexProduct = products.findIndex(elem => elem.product === idProd)
                    console.log( `indexProduct ${indexProduct}`);
                    if(indexProduct === -1) {
                        //let newProduct = ;
                        carts[indexCart].products.push({ "product" : idProd, "quantity" : 1 });
                    } else {
                        let quantity = carts[indexCart].products[indexProduct].quantity;
                        quantity++;
                        carts[indexCart].products[indexProduct].quantity = quantity;
                    }
                    await fs.promises.writeFile(this.pathFile, JSON.stringify(carts));
                    return 1;
                } 
                else { return -3; } // PRODUCTO SIN STOCK
            }
            else { return -2; } // PRODUCTO NO ENCONTRADO
        }
    }
}

module.exports = cartsManager;