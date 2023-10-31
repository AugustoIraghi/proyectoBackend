import CartDTO from '../dto/cart.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async() => await this.dao.get()
    create = async(data) => {
        const dataToInsert = new CartDTO(data)
        await this.dao.create(dataToInsert)
        return dataToInsert._id
    }
    getById = async(id) => await this.dao.getById(id)
    updata = async(id, data) => await this.dao.updata(id, data)
    deleteById = async(id) => await this.dao.deleteById(id)
    addProduct = async(id, product) => await this.dao.addProduct(id, product)
    deleteProduct = async(id, product) => await this.dao.deleteProduct(id, product)
    deleteAllProducts = async(id) => await this.dao.deleteAllProducts(id)
    getProducts = async(id) => await this.dao.getProducts(id)
    purchase = async(id) => await this.dao.purchase(id)
}