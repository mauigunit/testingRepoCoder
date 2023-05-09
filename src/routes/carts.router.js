import { Router } from 'express';
import {
    getCartsController,
    createCartsController,
    addProdCartsController,
    deleteProdCartsController,
    updproductCartController,
    updCantProductCartController,
    deleteProductsCartController
} from '../controllers/carts.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { authToken } from '../middlewares/jwt.js'

const cartsRouter = Router();

cartsRouter.delete('/:cid/products/:pid', authMiddleware, authToken, deleteProdCartsController);
cartsRouter.put('/:cid', authMiddleware, authToken, updproductCartController);
cartsRouter.put('/:cid/products/:pid', authMiddleware, authToken, updCantProductCartController);
cartsRouter.delete('/:cid', authMiddleware, authToken, deleteProductsCartController);
cartsRouter.get('/:cid', authMiddleware, authMiddleware, authToken, getCartsController);
cartsRouter.post('/:cid/products/:pid', authMiddleware, authToken, addProdCartsController);


cartsRouter.post('/', authMiddleware, authToken, createCartsController);






export default cartsRouter;