import { Router } from 'express';
import { get, updata, deleteById, changeRole, changeStatus, changePassword, create, getById } from '../controllers/user.controller.js';
import { verifyUser, verifyAdmin, mailMiddleware } from '../utils/index.js';
import { signupMail } from '../controllers/mailing.controller.js';

const router = Router();

router.get('/', getById, get);
router.put('/', verifyAdmin, updata);
router.delete('/', verifyAdmin, deleteById);
router.post('/register', create, signupMail);
router.post('/change-role', changeRole);
router.get('/confirm-mail', mailMiddleware, changeStatus);
router.post('/change-password', verifyUser, changePassword);

export default router;