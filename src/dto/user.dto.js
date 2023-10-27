export default class UserDTO {
    constructor(user) {
        this.username = user.username
        this.password = user.password
        this.email = user.email
        this.firstname = user.firstname
        this.lastname = user.lastname
        this.role = user.role || 'user'
        this.cart = user.cart
        this.status = user.status || 'pending'
    }
}