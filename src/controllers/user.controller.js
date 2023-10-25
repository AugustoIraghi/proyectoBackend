import { UserService } from "../repositories/user.repository.js";

export const get = async(res, res) => {
    const users = await UserService.get()
    res.json({ users })
}

export const create = async(req, res) => {
    const user = req.body
    const userNew = await UserService.create(user)
    res.json({ user: userNew })
}

export const getById = async(req, res) => {
    const { id } = req.params
    const user = await UserService.getById(id)
    res.json({ user })
}

export const updata = async(req, res) => {
    const { id } = req.params
    const user = req.body
    const userUpdata = await UserService.updata(id, user)
    res.json({ user: userUpdata })
}

export const deleteById = async(req, res) => {
    const { id } = req.params
    const user = await UserService.deleteById(id)
    res.json({ user })
}