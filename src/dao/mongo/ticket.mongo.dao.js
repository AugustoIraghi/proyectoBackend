import TicketModel from "../models/ticket.model.js";

export default class Ticket {
    get = async () => await TicketModel.find();
    create = async (data) => await TicketModel.create(data);
    getById = async (id) => await TicketModel.findById(id);
    deleteById = async (id) => await TicketModel.deleteOne({ _id: id });
    paginate = async (page, filter) =>
        await TicketModel.paginate(filter, { page, limit: 10 });
}