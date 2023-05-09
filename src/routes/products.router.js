import { Router } from 'express';
import {
    getProdController,
    getPIDController,
    createProdController,
    updateProdController, 
    deleteProdController
} from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { authToken } from '../middlewares/jwt.js'

const prodRouter = Router();

prodRouter.get('/', authMiddleware, authToken, getProdController);
prodRouter.get('/:pid', authMiddleware, authToken, getPIDController);
prodRouter.post('/', authMiddleware, authToken, createProdController);
prodRouter.put('/:pid', authMiddleware, authToken, updateProdController);
prodRouter.delete('/:pid', authMiddleware, authToken, deleteProdController);

export default prodRouter;