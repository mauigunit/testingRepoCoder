import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import expHandlebars from 'express-handlebars';
import prodRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/carts.router.js';
import loginRouter from './src/routes/login.router.js';
import passport from 'passport'
import sessionGithubRouter  from './src/routes/session.router.js'
import inicializePassport from './src/config/passport.config.js';
import config from './src/config/config.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'

const app = express();

const mongoStore = MongoStore.create({
    mongoUrl: config.CONNECTION_DB,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: config.EXPIRED_SESSION
})
app.use(session({
    store: mongoStore,
    secret: config.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(config.CONNECTION_DB, error => {
    if(error) {
        console.log(`cannot connect to db: ${error}`);
        process.exit();
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
inicializePassport();
app.use(passport.initialize());



app.engine('.hbs', expHandlebars({extname: '.hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', '.hbs');

app.use('/loginGithub', sessionGithubRouter);
app.use('/', loginRouter);
app.use('/api/products', prodRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionGithubRouter);

const server = app.listen(config.PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
});
server.on('error', error => console.log(error));
