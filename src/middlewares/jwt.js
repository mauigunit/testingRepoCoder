import jwt from 'jsonwebtoken';
import config from '../config/config.js';

function generateAuthToken(userToken) {
    const token = jwt.sign(userToken, config.PRIVATE_KET_JWT, { expiresIn: '5m' })
    return token;
}

function authToken(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        req.session.destroy();
        /*res.status(401).json(
            {
                error: 'se requiere autorizacion para acceder a este recurso',
                detail: 'formato de token invalido'
            });*/
            return res.redirect('/login');
    }
    try {
        req.user = jwt.verify(token, config.PRIVATE_KET_JWT);
    } catch (error) {
        req.session.destroy();
        /*res.status(403).json(
            {
                error: 'token invalido',
                detail: 'No tiene autorización para consumir el recuro'
            });*/
        return res.redirect('/login');
    }
    next();
}

export { authToken, generateAuthToken }