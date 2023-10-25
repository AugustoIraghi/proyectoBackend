import UserService from "../repositories/user.repository.js";

export const get = async(req, res) => {
    const users = await UserService.get()
    res.json({ users })
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
    const { id } = req.params
    const { role } = req.body
    if (!id || !role) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const user = await UserService.changeRole(id, role)
    res.json({ user })
}