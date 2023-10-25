import express from 'express';
import cartRouter from './routers/cart.router.js';
import productRouter from './routers/product.router.js';
import userRouter from './routers/user.router.js';
import jwtRouter from './routers/jwt.router.js';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import logger from './utils/logger.js'
import swaggerUiExpress from 'swagger-ui-express'
import specs from './utils/swagger.js';


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secret'));
initializePassport()
app.use(passport.initialize())

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/jwt', jwtRouter);

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.get('/loggerTest', (req, res) => {
    logger.debug('Esto es un debug')
    logger.http('Esto es un http')
    logger.info('Esto es un info')
    logger.warn('Esto es un warn')
    logger.error('Esto es un error')
    res.send('Logger test')
});

app.listen(8080, () => logger.info('Server up en puerto 8080'));