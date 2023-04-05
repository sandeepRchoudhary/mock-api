import express from 'express';

import { pagination, productInputValidator } from '../middleware/commonFunction.js';
import { prodData } from '../mock-data/productData.js';
import apiResponse from '../helper/apiResponse.js';

const productRoute = express.Router();

const data = prodData;

productRoute.get("/", (req, res) => {
    if (data) {
        return apiResponse(res, 200, "data fetched successfully!", data);
    } else {
        return apiResponse(res, 404, "data not found");
    }
})

productRoute.get('/q?', (req, res) => {
    const { page_number, per_page } = req.query
    const products = pagination(data,page_number,per_page);
    return apiResponse(res,200,"product by pagination ",products)
})

productRoute.get("/:id", (req, res) => {
    const singleProduct = req.params.id
    let productExist = data.find((data) => data.id == singleProduct);
    if (productExist) {
        return apiResponse(res, 200, "product fetched successfully", productExist);
    } else {
        return apiResponse(res, 404, 'user not found');
    }
})

productRoute.delete('/:id', (req, res) => {
    const isExists = req.params.id;
    if (isExists) {
        let deletedUser = data.filter((data) => data.id != isExists);
        return apiResponse(res, 200, 'user deleted', deletedUser);
    } else {
        return apiResponse(res, 404, 'user not exists');
    }

})

productRoute.post("/", productInputValidator, (req, res) => {
    data.push(req.body);
    res.status(201).json({ "isCreated": data });
});

productRoute.put('/', (req, res) => {
    const { id, title, body } = req.body
    const isExists = data.find((data) => data.id == id);
    if (isExists) {
        // isExists.id = id
        isExists.title = title ? title : isExists.title;
        isExists.body = body ? body : isExists.body
        data.map((udata) => udata.id == id ? udata = isExists : udata);
        return apiResponse(res, 200, "updated successfully", data);
    } else {
        return apiResponse(res, 404, 'data yet to update', data)
    }
})

export default productRoute;