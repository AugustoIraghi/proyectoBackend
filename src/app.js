import express from 'express';
import cartRouter from './routers/cart.router.js';
import productRouter from './routers/product.router.js';
import userRouter from './routers/user.router.js';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


const app = express();

app.use(express.json());
app.use(cookieParser('secret'));

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);