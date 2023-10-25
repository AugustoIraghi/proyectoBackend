import ProductModel from '../models/product.model.js';

export default class Product {
    get = async() => await ProductModel.find()
    create = async(data) => await ProductModel.create(data)
    getById = async(id) => await ProductModel.findById(id)
    updata = async(id, data) => await ProductModel.updateOne({ _pid: id }, data)
    deleteById = async(id) => await ProductModel.deleteOne({ _pid: id })
}