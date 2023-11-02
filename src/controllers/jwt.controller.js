import { UserService } from '../repositories/index.js'
import { JWT_COOKIE_NAME, generateToken, isValidPassword } from '../utils/index.js'

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) throw new Error('Missing params')
        const user = await UserService.getByEmail(email)

        if (!user) throw new Error('User not found')
        const valid = isValidPassword(user, password)

        if (!valid) throw new Error('Invalid password')
        const token = generateToken(user)

        res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, signed: true }).json({ status: 'success', message: 'Logged in succesfully' })
        
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).json({ status: 'success', message: 'Logged out succesfully' })
}