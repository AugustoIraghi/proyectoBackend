import { Router } from 'express'
import { signupMail } from '../controllers/mailing.controller.js'
import { authToken, passportCall } from '../utils/index.js'
import { login, logout, register } from '../controllers/jwt.controller.js';

const router = Router()

router.post('/register', register, signupMail)

router.post('/login', passportCall('jwt'), login)

router.get('/logout', logout)

router.get('/me', authToken, (req, res) => {
    res.send({ status: 'success', user: req.user })
})

export default router