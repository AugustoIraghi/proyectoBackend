import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CartSchema = new mongoose.Schema({
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
});

// CartSchema.pre('findOne', function() {
//     this.populate('products.product');
// });

CartSchema.plugin(mongoosePaginate);

const CartModel = mongoose.model("cart", CartSchema);

export default CartModel;