import UserModel from '../models/user.model.js'

export default class User {
    get = async() => await UserModel.find()
    create = async(data) => {
        await UserModel.create(data)
        return data
    }
    getById = async(id) => await UserModel.findById(id)
    getByEmail = async(email) => await UserModel.findOne({ email })
    updata = async(id, data) => await UserModel.updateOne({ _id: id }, data)
    deleteById = async(id) => await UserModel.deleteOne({ _id: id })
    changeRole = async(id, role) => await UserModel.updateOne({ _id: id }, { role })
    changeStatus = async(email, status) => await UserModel.updateOne({ email: email }, { status })
    changePassword = async(email, password) => await UserModel.updateOne({ email: email }, { password })
}