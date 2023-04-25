import express from 'express';

import { productInputValidator } from '../middleware/validator.js';
import { productsData } from '../mock-data/productData.js';
import apiResponse from '../helper/apiResponse.js';
import { findById, pagination } from '../helper/commonFunction.js';

const productRoute = express.Router();

const products = productsData;

//fetching all products
productRoute.get("/", (req, res) => {
    if (products) {
        return apiResponse(res, 200, "products fetched successfully!", products);
    } else {
        return apiResponse(res, 404, "products not found");
    }
})

//pagination for products
productRoute.get('/q?', (req, res) => {
    const { page_number, per_page } = req.query
    const productsPerPage = pagination(products, page_number, per_page);
    return apiResponse(res, 200, "product by pagination", productsPerPage)
})

//fetching the single product from list of product 
productRoute.get("/:id", (req, res) => {
    const productId = req.params.id
    const productExist = findById(products, productId);
    if (productExist) {
        return apiResponse(res, 200, "product fetched successfully", productExist);
    } else {
        return apiResponse(res, 404, 'user not found');
    }
})

//deletion in products
productRoute.delete('/:id', (req, res) => {
    const isExists = req.params.id;
    if (isExists) {
        let deletedUser = products.filter((data) => data.id != isExists);
        return apiResponse(res, 200, 'user deleted', deletedUser);
    } else {
        return apiResponse(res, 404, 'user not exists');
    }

})

//createing prducts 
productRoute.post("/", productInputValidator, (req, res) => {
    products.push(req.body);
    res.status(201).json({ "isCreated": products });
});

//update for product
productRoute.patch('/', (req, res) => {
    const { id, title, body } = req.body
    const isExists = findById(products,id);
    if (isExists) {
        // isExists.id = id
        isExists.title = title ? title : isExists.title;
        isExists.body = body ? body : isExists.body
        products.map((udata) => udata.id == id ? udata = isExists : udata);
        return apiResponse(res, 200, "updated successfully", products);
    } else {
        return apiResponse(res, 404, 'data yet to update', products)
    }
})

export default productRoute;