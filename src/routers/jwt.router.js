import { Router } from 'express'
import { verifyUser } from '../utils/index.js'
import { login, logout } from '../controllers/jwt.controller.js';

const router = Router()

router.post('/login', login)

router.get('/logout', logout)

router.get('/profile', verifyUser, (req, res) => {
    res.send({ status: 'success', user: req.user })
})

export default router