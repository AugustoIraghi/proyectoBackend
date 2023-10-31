import mongoose from "mongoose"

export default class ProductDTO {
    constructor(product) {
        this._pid = new mongoose.Types.ObjectId()
        this.name = product.name
        this.brand = product.brand || ''
        this.price = product.price
        this.stock = product.stock
        this.category = product.category
        this.thumbnail = product.thumbnail || ''
        this.description = product.description || ''
    }
}