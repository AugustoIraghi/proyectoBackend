import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    _id: false,
    _pid: mongoose.ObjectId,
    name: { type: String, required: true},
    brand: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
    category: { type: String, required: true},
    thumbnail: String,
    description: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("product", productSchema);

export default productModel;