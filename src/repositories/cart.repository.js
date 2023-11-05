import CartDTO from '../dto/cart.dto.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async() => await this.dao.get()
    create = async(data) => {
        const dataToInsert = new CartDTO(data)
        return await this.dao.create(dataToInsert)
    }
    getById = async(id) => await this.dao.getById(id)
    updata = async(id, data) => await this.dao.updata(id, data)
    deleteById = async(id) => await this.dao.deleteById(id)
    addProduct = async(id, productId, quantity) => await this.dao.addProduct(id, productId, quantity)
    deleteProduct = async(id, productId, quantity) => await this.dao.deleteProduct(id, productId, quantity)
    deleteAllProducts = async(id) => await this.dao.deleteAllProducts(id)
    // getProducts = async(id) => await this.dao.getProducts(id)
    purchase = async(id, products) => await this.dao.purchase(id, products)
    paginate = async(page, filter) => await this.dao.paginate(page)
}