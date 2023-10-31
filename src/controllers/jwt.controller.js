import { UserService } from '../repositories/index.js'
import { JWT_COOKIE_NAME, generateToken, isValidPassword } from '../utils/index.js'

export const register = async (req, res, next) => {
    try {
        const { email, password, first_name, last_name } = req.body
        if (!email || !password || !first_name || !last_name) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const exists = await UserService.getByEmail(email)
        if (exists) return res.status(400).send({ status: 'error', error: 'User already exits' })
        next()
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const user = await UserService.getByEmail(email)
        if (!user) return res.status(400).send({ status: 'error', error: 'User not found' })
        const valid = isValidPassword(user, password)
        if (!valid) return res.status(400).send({ status: 'error', error: 'Invalid password' })
        const token = generateToken(user)
        res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, signed: true }).json({ status: 'success', message: 'Logged in succesfully' })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).json({ status: 'success', message: 'Logged out succesfully' })
}