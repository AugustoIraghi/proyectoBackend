import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ['premium', 'user', 'admin'], default: 'user' },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' }
});

UserSchema.pre('updateOne', async function(next) {
    if (!this._update.password) return next();
    const password = this._update.password;
    if (!password) return next();
    const hash = await bcrypt.hash(password, 10);
    this._update.password = hash;
    next();
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;