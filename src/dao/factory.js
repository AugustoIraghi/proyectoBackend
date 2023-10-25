import config from '../config/config.js'
import mongoose from 'mongoose'

export let Cart
export let Product
export let User

switch (config.persistence) {
    // case 'FILE':
    //     const { default: CartFile } = await import ('./file/cart.file.js')
    //     const { default: ProductFile } = await import ('./file/product.file.js')
    //     const { default: UserFile } = await import ('./file/user.file.js')
    //     User = UserFile
    //     Product = ProductFile
    //     Cart = CartFile
    //     break;
    case 'MONGO':
        mongoose.connect(config.mongoURI, { dbName: config.mongoDBname })
        const { default: CartMongo } = await import ('./mongo/cart.mongo.js')
        const { default: ProductMongo } = await import ('./mongo/product.mongo.js')
        const { default: UserMongo } = await import ('./mongo/user.mongo.js')
        User = UserMongo
        Product = ProductMongo
        Cart = CartMongo
        break;

    default:
        break;
}