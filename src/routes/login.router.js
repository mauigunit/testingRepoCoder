import { Router } from 'express';
import {
    loginInicioController,
    loginIniciarSesionController,
    registrarinicioController,
    registrarController,
    cerrarSesionController
} from '../controllers/login.controller.js';
import passport from 'passport';
import { sessionValidation, authMiddleware } from '../middlewares/auth.middleware.js'


const loginRouter = Router();

loginRouter.get('/', (req, res) =>{
    res.redirect('/login');
});
loginRouter.get('/login', sessionValidation, loginInicioController); 
loginRouter.post('/login', loginIniciarSesionController); 
loginRouter.get('/registrar', registrarinicioController); 
//loginRouter.post('/registrar', registrarController); 
loginRouter.post('/registrar', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req, res) => {
    res.json({status:"success", message:"Registrado correctamente"});
}); 
loginRouter.get('/failregister', async (req, res) =>{
    res.json({status:"error", message:"Usuario ya se encuentra registrado."});
}); 
loginRouter.get('/cerrarSesion', cerrarSesionController); 

export default loginRouter;