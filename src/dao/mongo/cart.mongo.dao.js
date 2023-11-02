import CartModel from '../models/cart.model.js';

export default class Cart {
    get = async() => await CartModel.find()
    create = async(data) => await CartModel.create(data)
    getById = async(id) => await CartModel.findById(id)
    updata = async(id, data) => await CartModel.updateOne({ _id: id }, data)
    deleteById = async(id) => await CartModel.deleteOne({ _id: id })
    addProduct = async(id, product) => await CartModel.updateOne({ _id: id }, { $push: { products: product } })
    deleteProduct = async(id, product) => await CartModel.updateOne({ _id: id }, { $pull: { products: product } })
    deleteAllProducts = async(id) => await CartModel.updateOne({ _id: id }, { $set: { products: [] } })
    getProducts = async(id) => await CartModel.findById(id, { products: 1 })
    purchase = async(id) => await CartModel.updateOne({ _id: id }, { $set: { state: 'closed' } })
    paginate = async(page) => await CartModel.paginate({ page, limit: 10 })
}