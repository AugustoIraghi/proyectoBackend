import { isValidPassword, generateToken, authToken, passportCall } from '../utils/index.js'
import { UserService } from '../repositories/index.js'

export const register = async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body
    if (!email || !password || !first_name || !last_name) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const exists = await UserService.getByEmail(email)
    if (exists) return res.status(400).send({ status: 'error', error: 'User already exits' })
    next()
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const verifyUser = await UserService.getByEmail(email)
    if (!verifyUser) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    if (!isValidPassword(verifyUser, password)) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    const access_token = generateToken(verifyUser)
    res.cookie('jwtcookie', access_token).json({ status: 'success', message: 'Logged in succesfully' })
}

export const logout = async (req, res) => {
    res.clearCookie('jwtcookie').json({ status: 'success', message: 'Logged out succesfully' })
}