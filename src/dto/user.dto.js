export default class UserDTO {
    constructor(user) {
        this.id = user.id || user._id || null
        this.username = user.username
        this.password = user.password
        this.email = user.email
        this.firstname = user.firstname
        this.lastname = user.lastname
        this.address = user.address
        this.phone = user.phone
        this.role = user.role || 'user'
        this.cart = user.cart || []
        this.timestamp = user.timestamp
    }
}