import mongoose from 'mongoose'

class containerMongoDB {
    constructor(collection, schema) {
        this.collections = mongoose.model(collection, schema);
    }

    async getProducts(limit, page, sort) {
        let products = await this.collections.paginate({}, {limit: limit, page: page, sort: {price: sort}});
        return products;
    }

    async getPIDProducts(pid) {
        let products = await this.collections.findOne({ _id: pid });
        return products;
    }

    async createProducts(newProduct) {
        let result = await this.collections.create(newProduct);
        return result;
    }

    async updateProducts(pid, product) {
        let result = await this.collections.updateOne({ _id: pid }, product);
        return result;
    }

    async deleteProducts(pid) {
        let result = await this.collections.deleteOne({ _id: pid });
        return result;
    }

    /***************************** carts ****************************************/
    async getCart(cid) {
        let result = await this.collections.findOne({ _id: cid });
        console.log(result);
        return result;
    }

    async getCartDetails(cid) {
        let result = await this.collections.findOne({ _id: cid }).populate("products.product");
        return result;
    }

    async createCart() {
        let result = await this.collections.create({products:[]});
        return result;
    }

    async addProdCart(cid, pid, quantity) {
        let result = await this.collections.updateOne({ _id: cid }, { $push: {products: {product: pid, quantity: quantity}}});
        return result;
    }

    async searchProdCart(cid) {
        let result = await this.collections.findOne({_id: cid});
        return result;
    }

    async updateCart(cid, cart) {
        let result = await this.collections.updateOne({ _id: cid }, cart);
        return result;
    }

    async deleteProductsCart(cid) {
        let result = await this.collections.updateMany(
            {_id: cid},
            { $set: { products: [] } }
          );
        return result;
    }

    /***************************** login ****************************************/
    async registerUser(user) {
        let result = await this.collections.create(user);
        return result;
    }

    async searchUser(search) {
        let result = await this.collections.findOne(search);
        return result;
    }

    async getUserId(search) {
        let result = await this.collections.findOne(search);
        return result;
    }
}

export default containerMongoDB;