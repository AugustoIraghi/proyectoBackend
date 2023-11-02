import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    brand: { type: String, required: true},
    price: { type: Number, required: true, min: 0},
    stock: { type: Number, required: true, min: 0},
    category: { type: String, required: true},
    thumbnail: String,
    description: String,
});

ProductSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;