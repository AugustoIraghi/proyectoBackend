export default class UserDTO {
    constructor(user) {
        this.email = user.email
        this.password = user.password
        this.role = user.role || 'user'
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.cart = user.cart
        this.status = user.status || 'pending'
    }
}