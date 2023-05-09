import { Router }  from 'express';
import { createHash }  from '../utils/index.js'

const routerAuth = Router();

routerAuth.post('/registro', async (req, res ) => {
    const { password } = req.body;
    let hash = createHash(password);
    res.json({passwordHash: hash});
});

export {routerAuth};