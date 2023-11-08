import { Router } from 'express';
import { get, create, getById, updata, deleteById } from '../controllers/product.controller.js';
import { verifyAdmin, verifyPremiumUser } from '../utils/index.js';

const router = Router();

// admin
router.get('/:page', verifyAdmin, get);

// admin/premium
router.get('/', verifyPremiumUser, getById);
router.post('/', verifyPremiumUser, create);
router.put('/', verifyPremiumUser, updata);
router.delete('/', verifyPremiumUser, deleteById);

export default router;