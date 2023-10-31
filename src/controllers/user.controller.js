import { UserService, CartService } from '../repositories/index.js'

// export const get = async(req, res) => {
//     const users = await UserService.get()
//     res.json({ users })
// }

export const create = async(req, res, next) => {
    try {
        const { email, password, first_name, last_name } = req.body
        if (!email || !password || !first_name || !last_name) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const exists = await UserService.getByEmail(email)
        if (exists) return res.status(400).send({ status: 'error', error: 'User already exits' })
        const cart = await CartService.create({ products: [] })
        await UserService.create({ email, password , first_name, last_name, cart })
        req.user = { email, password , first_name, last_name, cart }
        next()
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const get = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        if (!id) {
            const users = await UserService.get()
            res.json({ users })
        } else {
            const user = await UserService.getById(id)
            res.json({ user })
        }
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const getByEmail = async(req, res) => {
    try {
        const { email } = req.query
        const user = await UserService.getByEmail(email)
        res.json({ user })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const user = req.body
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        await UserService.updata(id, user)
        res.json({ status: 'success', message: 'User updata succesfully', user })
    } catch {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        await UserService.deleteById(id)
        res.json({ status: 'success', message: 'User deleted succesfully' })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const changeRole = async(req, res) => {
    try {
        const { id, role } = req.user
        if (!id || !role) return res.status(400).send({ status: 'error', error: 'Missing params' })
        await UserService.changeRole(id, role)
        res.json({ status: 'success', message: 'Role changed succesfully', newRole: role })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const changeStatus = async(req, res) => {
    try {
        const { email } = req.user
        if (!email) return res.status(400).send({ status: 'error', error: 'Missing params' })
        let user = await UserService.getByEmail(email)
        let { status } = user
        status === 'active' ? status = 'inactive' : status = 'active'
        await UserService.changeStatus(email, status)
        res.json({ status: 'success', message: 'Status changed succesfully' })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const changePassword = async(req, res) => {
    try {
        const { email } = req.user
        const { password } = req.body
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Missing params' })
        await UserService.changePassword(email, password)
        res.json({ status: 'success', message: 'Password changed succesfully' })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}