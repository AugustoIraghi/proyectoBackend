import UserDTO from '../dto/user.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    get = async() => await this.dao.get()
    create = async(data) => {
        const dataToInsert = new UserDTO(data)
        await this.dao.create(dataToInsert)
    }
    getById = async(id) => await this.dao.getById(id)
    getByEmail = async(email) => await this.dao.getByEmail(email)
    updata = async(id, data) => await this.dao.updata(id, data)
    deleteById = async(id) => await this.dao.deleteById(id)
}