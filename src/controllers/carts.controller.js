import {
    getCartsService,
    createCartsService,
    addProdCartsService,
    updateProdCartsService,
    deleteProdCartsService,
    getCartsDetailsService
} from '../services/carts.service.js'

import {
    getProdPIDService
} from '../services/products.service.js'

const getCartsController = async (req, res) => {
    try {
        let cart = await getCartsDetailsService(req.params.cid);
        if(process.env.TYPE_RESULT == 'VIEWS')
        {
            let objCart = {
                id: req.params.cid,
                products: cart.products.map(item => item.toObject()),
            }
            res.render('carts', {objCart});
        }
        else
            res.json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const createCartsController = async (req, res) => {
    try {
        let cid = await createCartsService();
        res.json({ status: "success", payload: cid });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const addProdCartsController = async (req, res) => {
    try {
        let product = await getProdPIDService(req.params.pid);
        if(product) {
            let cart = await getCartsService(req.params.cid);
            let indexProduct = cart.products.findIndex(x => x.product == req.params.pid);
            if(indexProduct > -1) {
                cart.products[indexProduct].quantity = (cart.products[indexProduct].quantity + 1);
                let result = await updateProdCartsService(req.params.cid, cart);
                res.json({ status: "success", payload: result });
            } else {
                let result = await addProdCartsService(req.params.cid, req.params.pid, 1);
                res.json({ status: "success", payload: result });
            }
        } else {
            res.status(400).json({ "status": "error", "message": `product id ${req.params.pid} not found` });
        }
    } catch (error) {
        res.status(500).json({ "status": false, "message": `${error}` });
    }
}

const deleteProdCartsController = async (req, res) => {
    try {
        let cart = await getCartsService(req.params.cid);
        let indexProduct = cart.products.findIndex(x => x.product == req.params.pid);
        if(indexProduct > -1) {
            cart.products.splice(indexProduct, 1);
            let response = await updateProdCartsService(req.params.cid, cart)
            res.json({ status: "success", payload: response });
        } else {
            res.status(400).json({ "status": "error", "message": `product id ${req.params.pid} not found` });
        }
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const updproductCartController = async (req, res) =>{
    try {
        let response = await updateProdCartsService(req.params.cid, {products: req.body})
        res.json({ status: "success", payload: response });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const updCantProductCartController = async (req, res) =>{
    try {
        if(!req.body.quantity){
            res.status(400).json({ "status": "error", "message": `required quantity` });
        }
        else {
            let cart = await getCartsService(req.params.cid);
            let indexProduct = cart.products.findIndex(pid => pid.product === req.params.pid);
            if(indexProduct >-1) {
                cart.products[indexProduct].quantity = req.body.quantity;
                let response = await updateProdCartsService(req.params.cid, cart)
                res.json({ status: "success", payload: response });
            } else {
                res.status(400).json({ "status": "error", "message": `product not found` });
            }
        }
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}

const deleteProductsCartController = async (req, res) =>{
    try {
        let response = await deleteProdCartsService(req.params.cid)
        res.json({ status: "success", payload: response });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": `${error}` });
    }
}


export { getCartsController, createCartsController, addProdCartsController, deleteProdCartsController, updproductCartController, updCantProductCartController, deleteProductsCartController };