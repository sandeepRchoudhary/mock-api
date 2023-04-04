import express from 'express';

import { dynamicData } from "../mock-data/data.js";
import apiResponse from '../helper/apiResponse.js';
import { inputValidator } from '../middleware/commonFunction.js';

const userRoute = express.Router();

const data = dynamicData

userRoute.get("/users", (req, res) => {
    if (data) {
        return apiResponse(res, 200, "data fetched successfully!", data);
    } else {
        return apiResponse(res, 404, "data not found");
    }
})

userRoute.get("/users/:id", (req, res) => {
    const singleUser = req.params.id
    let user = data.find((data) => data.id == singleUser);
    if(user){
        return apiResponse(res,200,"user fetched successfully",user);
    }else{
        return apiResponse(res,404,'user not found');
    }
})

userRoute.delete('/users/:id', (req, res) => {
    const isExists = req.params.id;
    if(isExists){
      let deletedUser = data.filter((data) => data.id != isExists);
        return apiResponse(res,200,'user deleted',deletedUser);
    }else{
        return apiResponse(res,404,'user not exists')
    }
   
})

userRoute.post("/users",inputValidator,(req, res) => {

    data.push(req.body);
    res.status(201).json({ "isCreated": data });
});

userRoute.put('/users', (req, res) => {

    const { id, name, email, phone } = req.body
    const isExists = data.find((data) => data.id == id);
    if (isExists) {
        // isExists.id = id
        isExists.name = name?name:isExists.name;
        isExists.email = email?email:isExists.email;
        isExists.phone = phone?phone:isExists.phone;
        data.map((udata) =>udata.id==id?udata=isExists:udata);
        return apiResponse(res,200,"updated successfully",data);
    }else{
        return apiResponse(res,404,'data yet to update',data)
    }
})

export default userRoute;