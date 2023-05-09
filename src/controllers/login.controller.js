import {
    registerUser,
    loginUser
} from '../services/login.service.js'
import { createHash, isValidPassword }  from '../utils/utils.js'
import { generateAuthToken } from '../middlewares/jwt.js';
import config from '../config/config.js';

const loginInicioController = async (req, res) => {
    try {
        res.render('login', {})
    } catch (error) {
        res.render('error', {link: 'login', error: error, texto: 'login'})
    }
}

const loginIniciarSesionController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email);
        if(result){
            if(isValidPassword(password, result.password)) {
                
                const userToken = {
                    last_name: result.last_name,
                    first_name: result.first_name,
                    email: result.email,
                    role: result.role
                }

                const token = generateAuthToken(userToken);
                const finalizaSesion = (config.EXPIRED_SESSION * 1000);
                req.session.user = { usuario: result.first_name, email: result.email , rol: result.role, token: token }
                res.cookie('authToken', token, { maxAge: finalizaSesion, httpOnly: true }).json({ status: 'success', message: `Sesión iniciada correctamente`, link: '/api/products'});
            } else {
                res.status(401).json({ "status": 'error', "message": `credenciales incorrectas`});
            }
        } else {
            res.status(401).json({ "status": 'error', "message": `credenciales incorrectas`});
        }
    } catch (error) {
        res.status(500).json({ "status": 'error', "message": `error al iniciar sesión: ${error}`});
    }
}

const registrarinicioController = async (req, res) => {
    try {
        res.render('register', {})
    } catch (error) {
        
    }
}

const registrarController = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const passHash = createHash(password);
        const newuser = { first_name, last_name, email, password: passHash, role }
        console.log(newuser);
        const result = await registerUser(newuser);
        if(result)
            res.json({status:"success", message:"Registrado correctamente"});
        else
            res.status(400).json({status:"error", message: "No fue posible registrar."});
    } catch (error) {
        res.status(500).json({status:"error", message: `Error al registrar ${error}`});
    }
}

const cerrarSesionController = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        res.render('error', {link: '/login', error: error, texto: 'login'})
    }
}

export { loginInicioController, loginIniciarSesionController, registrarinicioController, registrarController, cerrarSesionController };