import CartService from "../repositories/cart.repository.js";

export const get = async(req, res) => {
    const carts = await CartService.get()
    res.json({ status: 'success', carts })
}

export const create = async(req, res) => {
    const cartNew = await CartService.create(cart)
    res.json({ status: 'success', cart: cartNew })
}

export const getById = async(req, res) => {
    const { id } = req.params
    const cart = await CartService.getById(id)
    res.json({ status: 'success', cart })
}

export const updata = async(req, res) => {
    const { id } = req.params
    const cart = req.body
    const cartUpdata = await CartService.updata(id, cart)
    res.json({ status: 'success', cart: cartUpdata })
}

export const deleteById = async(req, res) => {
    const { id } = req.params
    const cart = await CartService.deleteById(id)
    res.json({ status: 'success', cart })
}

export const addProduct = async(req, res) => {
    const { id } = req.params
    const { product } = req.body
    if (!id || !product) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const cart = await CartService.addProduct(id, product)
    res.json({ status: 'success', cart })
}

export const deleteProduct = async(req, res) => {
    const { id } = req.params
    const { product } = req.body
    if (!id || !product) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const cart = await CartService.deleteProduct(id, product)
    res.json({ status: 'success', cart })
}

export const deleteAllProducts = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const cart = await CartService.deleteAllProducts(id)
    res.json({ status: 'success', cart })
}

export const getProducts = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const cart = await CartService.getProducts(id)
    res.json({ status: 'success', cart })
}

export const purchase = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const cart = await CartService.purchase(id)
    const cartNew = await CartService.create(cart)
    res.json({ status: 'success', cart, cartNew })
}