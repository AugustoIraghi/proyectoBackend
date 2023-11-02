import { UserService, CartService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        const { page } = req.params
        const filter = req.body
        const users = await UserService.paginate(page, filter)
        res.json({ status: 'success', users: users.docs })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const create = async(req, res, next) => {
    try {
        const { email, password, first_name, last_name } = req.body
        if (!email || !password || !first_name || !last_name) throw new Error('Missing params')
        const exists = await UserService.getByEmail(email)
        if (exists) throw new Error('User already exists')
        const cart = await CartService.create({ products: [] })
        await UserService.create({ email, password , first_name, last_name, cart: cart._id })
        req.user = { email, password , first_name, last_name, cart: cart._id }
        next()
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getById = async(req, res, next) => {
    try {
        const { id } = req.query
        if (!id ) return next()
        const user = await UserService.getById(id)
        res.json({ status: 'success', user })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getByEmail = async(req, res) => {
    try {
        const { email } = req.query
        const user = await UserService.getByEmail(email)
        res.json({ user })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const user = req.body
        if (!id) throw new Error('Missing params')
        await UserService.updata(id, user)
        res.json({ status: 'success', message: 'User updata succesfully', user })
    } catch {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) throw new Error('Missing params')
        await UserService.deleteById(id)
        res.json({ status: 'success', message: 'User deleted succesfully' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const changeRole = async(req, res) => {
    try {
        const { id, role } = req.user
        if (!id || !role) throw new Error('Missing params')
        await UserService.changeRole(id, role)
        res.json({ status: 'success', message: 'Role changed succesfully', newRole: role })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const changeStatus = async(req, res) => {
    try {
        const { email } = req.user
        if (!email) throw new Error('Missing params')
        let user = await UserService.getByEmail(email)
        let { status } = user
        if (status === 'active') throw new Error('User is already active')
        status = 'active'
        await UserService.changeStatus(email, status)
        res.json({ status: 'success', message: 'Mail confirmed succesfully' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const changePassword = async(req, res) => {
    try {
        const { email } = req.user
        const { password } = req.body
        if (!email || !password) throw new Error('Missing params')
        await UserService.changePassword(email, password)
        res.json({ status: 'success', message: 'Password changed succesfully' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}