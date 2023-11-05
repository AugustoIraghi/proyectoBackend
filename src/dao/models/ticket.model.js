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
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

TicketSchema.statics.findByUserId = async function(userId) {
    return await this.findOne({ userId });
};

// TicketSchema.pre("save", async function(next) {
//     console.log(this.products);
//     // this.products.populate('products')
//     // console.log(this.products.reduce((total, product) => total + product.price * product.quantity, 0));
//     this.total = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
//     next();
// });

TicketSchema.methods.calculateTotal = function(products) {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
}

TicketSchema.plugin(mongoosePaginate);

const TicketModel = mongoose.model("ticket", TicketSchema);

export default TicketModel;