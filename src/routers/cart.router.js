import { Router } from 'express';
import { get, create, getById, updata, deleteById, addProduct, deleteProduct, deleteAllProducts, purchase, getProducts } from '../controllers/cart.controller.js';
import { verifyAdmin, verifyUser } from '../utils/index.js';

const router = Router();

//admin
router.post('/', verifyAdmin, create);
router.get('/', verifyAdmin, getById, get);
router.put('/', verifyAdmin, updata);
router.delete('/', verifyAdmin, deleteById);

//user
router.get('/myCart', verifyUser, getProducts);
router.post('/addProduct', verifyUser, addProduct);
router.put('/deleteProduct', verifyUser, deleteProduct);
router.put('/deleteAllProducts', verifyUser, deleteAllProducts);
router.get('/purchase', verifyUser, purchase);


export default router;