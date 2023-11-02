import { ProductService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        const { page } = req.params
        const filter = req.body
        const products = await ProductService.paginate(page, filter)
        res.json({ status: 'success', products: products.docs })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const create = async(req, res) => {
    try {
        const { name, brand, price, stock, category, thumbnail, description } = req.body
        if (!name || !brand || !price || !stock || !category) throw new Error('Missing params')
        await ProductService.create({ name, brand, price, stock, category, thumbnail, description })
        res.json({ status: 'success', message: 'Product created' })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const getById = async(req, res, next) => {
    try {
        const { id } = req.query
        if (!id) return next()
        const product = await ProductService.getById(id)
        res.json({ status: 'success', product })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const updata = async(req, res) => {
    try {
        const { id } = req.query
        const product = req.body
        if (!id) throw new Error('Missing params')
        const productUpdata = await ProductService.updata(id, product)
        res.json({ status: 'success', message: 'Product updated', product: productUpdata })
    } catch {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        const { id } = req.query
        if (!id) throw new Error('Missing params')
        await ProductService.deleteById(id)
        res.json({ status: 'success', message: 'Product deleted' })
    } catch {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const updateStock = async(req, res) => {
    try {
        const { id, stock } = req.query
        if (!id || !stock) throw new Error('Missing params')
        await ProductService.updateStock(id, stock)
        res.json({ status: 'success', message: 'Stock updated' })
    } catch {
        res.status(400).send({ status: 'error', message: error.message })
    }
}

export const paginate = async(req, res) => {
    try {
        const { page } = req.query
        const filter = req.body
        const products = await ProductService.paginate(page, filter)
        res.json({ products })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
}