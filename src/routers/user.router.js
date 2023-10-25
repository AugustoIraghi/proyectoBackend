import { Router } from 'express';
import { get, create, getById, updata, deleteById } from '../controllers/user.controller.js';

const router = Router();

router.get('/', get);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', updata);
router.delete('/:id', deleteById);

export default router;