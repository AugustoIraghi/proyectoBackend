import { UserService, CartService } from '../repositories/index.js'
import { createHash } from "../utils/index.js";

export const get = async(req, res) => {
    const users = await UserService.get()
    res.json({ users })
}

export const create = async(req, res, next) => {
    const { email, password, first_name, last_name } = req.body
    if (!email || !password || !first_name || !last_name) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const hashPassword = createHash(password)
    const cart = await CartService.create()
    console.log(cart)
    const userNew = await UserService.create({ email, password: hashPassword, first_name, last_name, cart: cart._id })
    req.user = userNew
    next()
}

export const getById = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const user = await UserService.getById(id)
    res.json({ user })
}

export const getByEmail = async(req, res) => {
    const { email } = req.params
    const user = await UserService.getByEmail(email)
    res.json({ user })
}

export const updata = async(req, res) => {
    const { id } = req.params
    const user = req.body
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const userUpdata = await UserService.updata(id, user)
    res.json({ user: userUpdata })
}

export const deleteById = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const user = await UserService.deleteById(id)
    res.json({ user })
}

export const changeRole = async(req, res) => {
    const { id, role } = req.user
    if (!id || !role) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const user = await UserService.changeRole(id, role)
    res.json({ user })
}

export const changeStatus = async(req, res) => {
    const { email } = req.user
    if (!email) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const status = await UserService.getByEmail(email).status
    role === 'active' ? status = 'inactive' : status = 'active'
    const user = await UserService.changeStatus(email, status)
    res.json({ user })
}

export const changePassword = async(req, res) => {
    const { email } = req.user
    const { newPassword } = req.body
    if (!email || !newPassword) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const hashPassword = createHash(newPassword)
    const user = await UserService.changePassword(email, hashPassword)
    res.json({ user })
}
