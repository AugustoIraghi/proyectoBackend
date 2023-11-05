import { Router } from 'express';
import { get, updata, deleteById, changeRole, changeStatus, changePassword, create, getById } from '../controllers/user.controller.js';
import { verifyUser, verifyAdmin, verifyMail } from '../utils/index.js';
import { resetPasswordMail, signupMail } from '../controllers/mailing.controller.js';

const router = Router();

// admin
router.get('/', verifyAdmin, getById, get);
router.put('/', verifyAdmin, updata);
router.delete('/', verifyAdmin, deleteById);
router.post('/change-role', verifyAdmin, changeRole);

// user
router.post('/register', create, signupMail);
router.get('/confirm-mail', verifyMail, changeStatus);
router.post('/change-password', verifyUser, changePassword);

// forgot password
router.post('/reset-password-mail', resetPasswordMail);
router.post('/reset-password', verifyMail, changePassword);

export default router;