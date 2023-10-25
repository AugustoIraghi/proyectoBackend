import ProductService from "../repositories/product.repository.js";

export const get = async(req, res) => {
    const products = await ProductService.get()
    res.json({ products })
}

export const create = async(req, res) => {
    const { name, brand, price, stock, category, thumbnail, description } = req.body
    if (!name || !brand || !price || !stock || !category) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const productNew = await ProductService.create(product)
    res.json({ product: productNew })
}

export const getById = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const product = await ProductService.getById(id)
    res.json({ product })
}

export const updata = async(req, res) => {
    const { id } = req.params
    const product = req.body
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const productUpdata = await ProductService.updata(id, product)
    res.json({ product: productUpdata })
}

export const deleteById = async(req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send({ status: 'error', error: 'Missing params' })
    const product = await ProductService.deleteById(id)
    res.json({ product })
}