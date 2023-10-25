import UserModel from '../models/user.model.js'

export default class User {
    get = async() => await UserModel.find()
    create = async(data) => await UserModel.create(data)
    getById = async(id) => await UserModel.findById(id)
    getByEmail = async(email) => await UserModel.findOne({ email })
    updata = async(id, data) => await UserModel.updateOne({ _uid: id }, data)
    deleteById = async(id) => await UserModel.deleteOne({ _uid: id })
    changeRole = async(id, role) => await UserModel.updateOne({ _uid: id }, { role })
}