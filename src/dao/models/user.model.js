import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // _id: false,
    // _uid: mongoose.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ['premium', 'user', 'admin'], default: 'user' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' }});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;