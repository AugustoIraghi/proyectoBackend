import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
import { isValidPassword } from "../../utils/index.js";

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
    const oldPassword = await this.model.findOne(this.getQuery()).select('password');
    if (isValidPassword(oldPassword, password)) throw new Error('New password must be different from the old one');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    if (!password) return next();
    const hash = await bcrypt.hash(password, 10);
    this._update.password = hash;
    next();
})

UserSchema.pre('save', async function(next) {
    if (!this.password) return next();
    if (this.password.length < 6) throw new Error('Password must be at least 6 characters');
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;