import { ProductService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        const products = await ProductService.get()
        res.json({ products })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const create = async(req, res) => {
    try {
        const { name, brand, price, stock, category, thumbnail, description } = req.body
        if (!name || !brand || !price || !stock || !category) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const productNew = await ProductService.create({ name, brand, price, stock, category, thumbnail, description })
        res.json({ product: productNew })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const getById = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const product = await ProductService.getById(id)
        res.json({ product })
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const product = req.body
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const productUpdata = await ProductService.updata(id, product)
        res.json({ product: productUpdata })
    } catch {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
        const product = await ProductService.deleteById(id)
        res.json({ product })
    } catch {
        res.status(400).send({ status: 'error', error: error.message })
    }
}