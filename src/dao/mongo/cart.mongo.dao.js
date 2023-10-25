import CartModel from '../models/cart.model.js';

export default class Cart {
    get = async() => await CartModel.find()
    create = async(data) => await CartModel.create(data)
    getById = async(id) => await CartModel.findById(id)
    updata = async(id, data) => await CartModel.updateOne({ _id: id }, data)
    deleteById = async(id) => await CartModel.deleteOne({ _id: id })
}