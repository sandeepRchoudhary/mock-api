import { findById } from '../../../helper/commonFunction.js';
import { productsData } from '../../../mock-data/productData.js';
import { usersData } from '../../../mock-data/usersData.js'

const users = usersData;
const products = productsData

export const userQuery = {
    getAllUser: (_, args) => users,
    getSingleUser: (_, args) => findById(users, args.id)
}

export const productQuery = {
    getAllProduct: (_, args) => products,
    getSingleProduct: (_, args) => findById(products, args.id)
}