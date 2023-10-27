import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema({
    // _id: false,
    // _cid: mongoose.ObjectId,
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

// cartSchema.pre('findOne', function() {
//     this.populate('products.product');
// });

cartSchema.plugin(mongoosePaginate);

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel;