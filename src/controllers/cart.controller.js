import { CartService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        const { page } = req.params
        const carts = await CartService.paginate(page)
        res.json({ status: 'success', carts: carts.docs })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const create = async(req, res) => {
    try {
        const cartNew = await CartService.create({products: []})
        res.json({ status: 'success', cart: cartNew })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getById = async(req, res, next) => {
    try {
        const { id } = req.query
        if (!id) return next()
        const cart = await CartService.getById(id)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getByUserId = async(req, res) => {
    try {
        const { id } = req.user.id
        if (!id) throw new Error('Missing params')
        const cart = await CartService.getById(id)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const cart = req.body
        const cartUpdata = await CartService.updata(id, cart)
        res.json({ status: 'success', cart: cartUpdata })
    } catch {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        const cart = await CartService.deleteById(id)
        res.json({ status: 'success', cart })
    } catch {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const addProduct = async(req, res) => {
    try {
        const { id } = req.user.cart
        const { product } = req.body
        if (!id || !product) throw new Error('Missing params')
        const cart = await CartService.addProduct(id, product)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.user.cart
        const { product } = req.body
        if (!id || !product) throw new Error('Missing params')
        const cart = await CartService.deleteProduct(id, product)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteAllProducts = async(req, res) => {
    try {
        const { id } = req.user.cart
        if (!id) throw new Error('Missing params')
        const cart = await CartService.deleteAllProducts(id)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getProducts = async(req, res) => {
    try {
        const { id } = req.user.cart
        if (!id) throw new Error('Missing params')
        const cart = await CartService.getProducts(id)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const purchase = async(req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error('Missing params')
        const cart = await CartService.purchase(id)
        const cartNew = await CartService.create(cart)
        res.json({ status: 'success', cart, cartNew })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}