import { CartService, ProductService, TicketService } from '../repositories/index.js'

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

// export const getByUserId = async(req, res) => {
//     try {
//         const uid = req.user.id
//         if (!id) throw new Error('Missing params')
//         const cart = await CartService.getById(id)
//         res.json({ status: 'success', cart })
//     } catch (err) {
//         res.status(400).send({ status: 'error', message: err.message })
//     }
// }

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
        const id = req.user.cart
        const { product, quantity } = req.body
        if (!id || !product || !quantity) throw new Error('Missing params')
        if ( !ProductService.getById(product) ) throw new Error('Invalid product')
        let cart = await CartService.getById(id)
        if (!cart) throw new Error('Cart not found')
        await cart.addProduct(product, quantity)
        res.json({ status: 'success', message: 'Product added to cart' })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const id = req.user.cart.toString()
        const { product, quantity } = req.body
        if (!id || !product || !quantity) throw new Error('Missing params')
        if ( !ProductService.getById(product) ) throw new Error('Invalid product')
        let cart = await CartService.getById(id)
        if (!cart) throw new Error('Cart not found')
        await cart.deleteProduct(product, quantity)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const deleteAllProducts = async(req, res) => {
    try {
        const id = req.user.cart.toString()
        if (!id) throw new Error('Missing params')
        const cart = await CartService.deleteAllProducts(id)
        res.json({ status: 'success', cart })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

export const getProducts = async(req, res) => {
    try {
        const id = req.user.cart.toString()
        if (!id) throw new Error('Missing params')
        const cart = await CartService.getById(id)
        res.json({ status: 'success', cart: cart.products })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
}

// export const purchase = async(req, res) => {
//     try {
//         const { id } = req.user.cart
//         if (!id) throw new Error('Missing params')
//         const cart = CartService.getById(id)
//         if (!cart) throw new Error('Cart not found')
//         if (!cart.products.length) throw new Error('Cart is empty')
//         const okProducts = cart.products.map(async(product) => await product.checkStock(product.quantity))
//         const unpurchasedProducts = cart.filterProducts(okProducts)
//         await CartService.purchase(id, unpurchasedProducts)
//         res.json({ status: 'success', purchasedProducts: okProducts, unpurchasedProducts })
//     } catch (err) {
//         res.status(400).send({ status: 'error', message: err.message })
//     }
// }

export const purchase = async(req, res) => {
    try {
        const id = req.user.cart.toString()
        if (!id) throw new Error('Missing params')
        const cart = await CartService.getById(id)
        if (!cart) throw new Error('Cart not found')
        if (!cart.products.length) throw new Error('Cart is empty')

        const okProducts = cart.products.filter((product) => product.quantity <= product.product.stock)
        if (!okProducts.length) throw new Error('No products available')

        const unpurchasedProducts = cart.filterProducts(okProducts)
        cart.products = unpurchasedProducts

        const total = okProducts.reduce((total, product) => total + product.product.price * product.quantity, 0)
        await TicketService.create({ products: okProducts, total })

        await cart.save()
        res.json({ status: 'success', purchasedProducts: okProducts, unpurchasedProducts })
    } catch (err) {
        res.status(400).send({ status: 'error', message: err.message })
    }
};