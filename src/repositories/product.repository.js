import ProductDTO from "../dto/product.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async() => await this.dao.get()
    create = async(data) => {
        const dataToInsert = new ProductDTO(data)
        await this.dao.create(dataToInsert)
    }
    getById = async(id) => await this.dao.getById(id)
    updata = async(id, data) => await this.dao.updata(id, data)
    deleteById = async(id) => await this.dao.deleteById(id)
    changeRole = async(id, role) => await this.dao.changeRole(id, role)
}
