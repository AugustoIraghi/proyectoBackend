import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TicketSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number
        }],
        default: []
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

TicketSchema.plugin(mongoosePaginate);

const TicketModel = mongoose.model("ticket", TicketSchema);

export default TicketModel;