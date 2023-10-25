import { CartService } from "../repositories/cart.repository.js";

export const get = async(req, res) => {
    const carts = await CartService.get()
    res.json({ carts })
}

export const create = async(req, res) => {
    const cart = req.body
    const cartNew = await CartService.create(cart)
    res.json({ cart: cartNew })
}

export const getById = async(req, res) => {
    const { id } = req.params
    const cart = await CartService.getById(id)
    res.json({ cart })
}

export const updata = async(req, res) => {
    const { id } = req.params
    const cart = req.body
    const cartUpdata = await CartService.updata(id, cart)
    res.json({ cart: cartUpdata })
}

export const deleteById = async(req, res) => {
    const { id } = req.params
    const cart = await CartService.deleteById(id)
    res.json({ cart })
}