import TicketDTO from "../dto/ticket.dto.js";

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }
    get = async () => await this.dao.get();
    create = async (data) => {
        const dataToInsert = new TicketDTO(data);
        return await this.dao.create(dataToInsert);
    };
    getById = async (id) => await this.dao.getById(id);
    deleteById = async (id) => await this.dao.deleteById(id);
    paginate = async (page, filter) => await this.dao.paginate(page, filter);
}
