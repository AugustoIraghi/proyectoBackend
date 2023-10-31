import { Router } from 'express';
import { get, updata, deleteById, changeRole, changeStatus, changePassword, create } from '../controllers/user.controller.js';
import { verifyUser, verifyAdmin } from '../utils/index.js';
import { signupMail } from '../controllers/mailing.controller.js';

const router = Router();

router.get('/', get);
router.put('/', verifyAdmin, updata);
router.delete('/', verifyAdmin, deleteById);
router.post('/register', create, signupMail);
router.post('/change-role', changeRole);
router.post('/confirm-mail', verifyUser, changeStatus);
router.post('/change-password', verifyUser, changePassword);

export default router;