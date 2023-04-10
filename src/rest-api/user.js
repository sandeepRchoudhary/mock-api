import express from 'express';

import apiResponse from '../helper/apiResponse.js';
import { userInputValidator } from '../middleware/validator.js';
import { findById } from '../helper/commonFunction.js';
import { usersData } from '../mock-data/usersData.js';

const userRoute = express.Router();

const users = usersData

//getting all users from the users data
userRoute.get("/", (req, res) => {
    if (users) {
        return apiResponse(res, 200, "users fetched successfully!", users);
    } else {
        return apiResponse(res, 404, "users not found");
    }
})

//getting single user from the users data
userRoute.get("/:id", (req, res) => {
    const userId = req.params.id
    const user = findById(users, userId)
    if (user) {
        return apiResponse(res, 200, "user fetched successfully", user);
    } else {
        return apiResponse(res, 404, 'user not found');
    }
})

//deleting user from the user users
userRoute.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const user = findById(users, userId)
    if (user) {
        const filteredUser = removeById(users, userId)
        return apiResponse(res, 200, 'remaining users', filteredUser);
    } else {
        return apiResponse(res, 404, 'user not exists')
    }
})

//creating new user
userRoute.post("/", userInputValidator, (req, res) => {
    users.push(req.body);
    return apiResponse(res, 201, "user created", users);
});

//updating the user
userRoute.patch('/', (req, res) => {
    const { id, name, email, phone } = req.body
    const alreadyUser = findById(users, id);
    if (alreadyUser) {
        alreadyUser.name = name ? name : alreadyUser.name;
        alreadyUser.email = email ? email : alreadyUser.email;
        alreadyUser.phone = phone ? phone : alreadyUser.phone;
        users.map((udata) => udata.id == id ? udata = alreadyUser : udata);
        return apiResponse(res, 200, "user updated successfully", users);
    } else {
        return apiResponse(res, 404, 'user not found', users)
    }
})

export default userRoute;