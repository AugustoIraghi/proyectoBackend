import ProductModel from '../models/product.model.js';

export default class Product {
    get = async() => await ProductModel.find()
    create = async(data) => await ProductModel.create(data)
    getById = async(id) => await ProductModel.findById(id)
    updata = async(id, data) => await ProductModel.updateOne({ _id: id }, data)
    deleteById = async(id) => await ProductModel.deleteOne({ _id: id })
    updateStock = async(id, stock) => {
        const product = await ProductModel.findById(id)
        if (!product.checkStock(stock)) throw new Error('Missing stock')
        const newStock = product.stock + stock
        await ProductModel.updateOne({_id: id}, { stock: newStock })
    }
    checkStock = async(id, stock) => {
        const product = await ProductModel.findById(id)
        const ok =await product.checkStock(stock)
        console.log('checkstock', ok)
        return ok
    }
    // updateStock = async(id, stock) => await ProductModel.updateOne({ _id: id }, { stock: stock })
    paginate = async(page, filter) => await ProductModel.paginate(filter, { page, limit: 10 })
}