import { CartService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        const carts = await CartService.get()
        res.json({ status: 'success', carts })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const create = async(req, res) => {
    try {
        const cartNew = await CartService.create({products: []})
        res.json({ status: 'success', cart: cartNew })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const getById = async(req, res) => {
    try {
        const { id } = req.query
        const cart = await CartService.getById(id)
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const cart = req.body
        const cartUpdata = await CartService.updata(id, cart)
        res.json({ status: 'success', cart: cartUpdata })
    } catch {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        const cart = await CartService.deleteById(id)
        res.json({ status: 'success', cart })
    } catch {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const addProduct = async(req, res) => {
    try {
        const { id } = req.query
        const { product } = req.body
        if (!id || !product) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const cart = await CartService.addProduct(id, product)
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.query
        const { product } = req.body
        if (!id || !product) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const cart = await CartService.deleteProduct(id, product)
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const deleteAllProducts = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const cart = await CartService.deleteAllProducts(id)
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const getProducts = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const cart = await CartService.getProducts(id)
        res.json({ status: 'success', cart })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const purchase = async(req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const cart = await CartService.purchase(id)
        const cartNew = await CartService.create(cart)
        res.json({ status: 'success', cart, cartNew })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}