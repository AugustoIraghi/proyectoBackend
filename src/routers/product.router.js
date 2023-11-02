import { Router } from 'express';
import { get, create, getById, updata, deleteById } from '../controllers/product.controller.js';
import { updateStock } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getById, get);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', updata);
router.delete('/:id', deleteById);
router.put('/:id', updateStock);

export default router;