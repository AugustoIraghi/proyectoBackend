import { Cart, Product, User } from '../dao/factory.js'
import CartRepository from './cart.repository.js'
import ProductRepository from './product.repository.js'
import UserRepository from './user.repository.js'

export const CartService = new CartRepository(new Cart())
export const ProductService = new ProductRepository(new Product())
export const UserService = new UserRepository(new User())