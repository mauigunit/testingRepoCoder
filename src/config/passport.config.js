import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import config from './config.js';
import jwt from 'passport-jwt'
import { registerUser, loginUser, getUserId } from '../services/login.service.js'
import { createHash, isValidPassword } from '../utils/utils.js'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


let usuarios = [];
const inicializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await getUserId({ _id: id });
        done(null, user);
    })

    passport.use('github', new GithubStrategy({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.CLIENT_URL,
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await loginUser(profile.emails[0].value)
            if (!user) {
                let newUser = {
                    firs_tname: profile._json.login,
                    last_name: "Github",
                    email: profile.emails[0].value,
                    age: 36,
                    password: "xxxxxxxxxxx"
                }
                let result = await registerUser(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            let user = await loginUser(username);
            if (user) {
                return done(null, false);
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            let result = await registerUser(newUser);
            return done(null, result);
        } catch (error) {
            return done('Error al registrar el usuario: ' + error);
        }
    }))

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:config.PRIVATE_KET_JWT,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done('Error al obtener cookie: ' + error);
        }
    }))
}

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}

export default inicializePassport;