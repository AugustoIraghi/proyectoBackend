export default class TicketDTO {
    constructor(ticket) {
        this.products = ticket.products
        this.total = ticket.total
        this.date = ticket.date
    }
}