import { findById, removeById } from "../../../helper/commonFunction.js";
import { productsData } from "../../../mock-data/productData.js";
import { usersData } from "../../../mock-data/usersData.js";

const users = usersData
const products = productsData

export const userMutation = {
    createUser: (_, args) => {
        users.push(args);
        return users
    },

    deleteUser: (_, args) => {
        const { id } = args;
        const isUserExists = findById(users, id);
        if (isUserExists) {
            const afterDeleteById = removeById(users, id)
            return afterDeleteById;
        }
    },

    updateUser: (_, args) => {
        const { id, name, email, phone } = args
        const isUserExists = findById(users, id)
        if (isUserExists) {
            isUserExists.name = name ? name : isUserExists.name
            isUserExists.email = email ? email : isUserExists.email
            isUserExists.phone = phone ? phone : isUserExists.phone
            users.map((user) => user.id == id ? user = isUserExists : user);
            return users;
        }
    }
}

//product mutation
export const productMutation = {
    createProduct: (_, args) => {
        products.push(args);
        return products;
    },

    deleteProduct: (_, args) => {
        const { id } = args
        const isProductExists = findById(products, id);
        if (isProductExists) {
            const productDeletedById = removeById(products, id);
            return productDeletedById;
        }
    },

    updateProduct: (_, args) => {
        const { id, title, body } = args
        const isProductExists = findById(products, id)
        if (isProductExists) {
            isProductExists.title = title ? title : isProductExists.title;
            isProductExists.body = body ? body : isProductExists.body;
            products.map((product) => product.id == id ? product = isProductExists : product)
            return products;
        }
    }
}