import { ProductService } from '../repositories/index.js'

export const get = async(req, res) => {
    try {
        let owner
        req.user.role === "admin" ? owner = "admin" : owner = req.user._id
        const { page } = req.params
        const filter = { owner }
        const products = await ProductService.paginate(page, filter)
        res.json({ status: 'success', products: products.docs })
    } catch (error) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const create = async(req, res) => {
    try {
        let owner
        req.user.role === "admin" ? owner = "admin" : owner = req.user._id
        const { name, brand, price, stock, category, thumbnail, description } = req.body
        if (!name || !brand || !price || !stock || !category) throw new Error('Missing params')
        await ProductService.create({ name, brand, price, stock, category, owner, thumbnail, description })
        res.json({ status: 'success', message: 'Product created' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getById = async(req, res, next) => {
    try {
        let owner
        req.user.role === "admin" ? owner = "admin" : owner = req.user._id
        const { id } = req.query
        if (!id) return next()
        const productOwner = await ProductService.getById(id).owner
        if (productOwner !== owner) throw new Error('You dont own that product')
        res.json({ status: 'success', product })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const updata = async(req, res) => {
    try {
        let owner
        req.user.role === "admin" ? owner = "admin" : owner = req.user._id
        const { id } = req.query
        const product = req.body
        if (!id) throw new Error('Missing params')

        const productOwner = await ProductService.getById(id).owner
        if (productOwner !== owner) throw new Error('You dont own that product')

        const productUpdata = await ProductService.updata(id, product)
        res.json({ status: 'success', message: 'Product updated', product: productUpdata })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteById = async(req, res) => {
    try {
        let owner
        req.user.role === "admin" ? owner = "admin" : owner = req.user._id
        const { id } = req.query
        if (!id) throw new Error('Missing params')

        const productOwner = await ProductService.getById(id).owner
        if (productOwner !== owner) throw new Error('You dont own that product')

        await ProductService.deleteById(id)
        res.json({ status: 'success', message: 'Product deleted' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

// export const updateStock = async(req, res) => {
//     try {
//         const { id } = req.query
//         const { stock } = req.body
//         if (!id || !stock) throw new Error('Missing params')
//         await ProductService.updateStock(id, stock)
//         res.json({ status: 'success', message: 'Stock updated' })
//     } catch (err) {
//         res.status(400).send({ status: 'error', message: err.message })
//     }
// }

export const paginate = async(req, res) => {
    try {
        const { page } = req.query
        const filter = req.body
        const products = await ProductService.paginate(page, filter)
        res.json({ products })
    } catch (error) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}