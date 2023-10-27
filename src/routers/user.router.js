import { Router } from 'express';
import { get, getById, updata, deleteById, changeRole, changeStatus, changePassword } from '../controllers/user.controller.js';
import { authToken } from '../utils/index.js';

const router = Router();

router.get('/', get);
router.get('/:id', getById);
router.put('/:id', updata);
router.delete('/:id', deleteById);
router.post('/change-role/', changeRole);
router.post('/confirm-mail/', authToken, changeStatus);
router.post('/change-password/', authToken, changePassword);

export default router;