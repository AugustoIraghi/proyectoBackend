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

// CartSchema.pre('findById', function() {
//     this.populate('products.product');
// });

CartSchema.methods.filterProducts = function(filter) {
    let filteredProducts = [];
    filter.forEach(element => {
        filteredProducts = this.products.filter(product => product.product._id === element.product._id);
    });
    return filteredProducts;
}

CartSchema.methods.addProduct = async function(product, quantity) {
    const index = this.products.findIndex(p => p.product._id.toString() === product);
    if (index === -1) {
        this.products.push({ product, quantity });
    } else {
        this.products[index].quantity += quantity;
    }
    await this.save();
}

CartSchema.methods.deleteProduct = async function(product, quantity) {
    const index = this.products.findIndex(p => p.product._id.toString() === product);
    if (index === -1) throw new Error('Product not found in cart');
    if (this.products[index].quantity > quantity) {
        this.products[index].quantity -= quantity;
    } else {
        this.products = this.products.filter(p => p.product._id.toString() !== product);
    }
    await this.save();
}


CartSchema.plugin(mongoosePaginate);

const CartModel = mongoose.model("cart", CartSchema);

export default CartModel;