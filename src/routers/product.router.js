import { Router } from 'express';
import { get, create, getById, updata, deleteById } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getById, get);
router.post('/', create);
router.put('/', updata);
router.delete('/', deleteById);

export default router;