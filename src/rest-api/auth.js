import express from 'express';

import apiResponse from '../helper/apiResponse.js';
import { generateToken, tokenVerify } from '../middleware/authentication.js';

const authRouter=express.Router();

const users=[{email:"sandeep@gmail.com",phone:"1234567890",password:"123456"}]

authRouter.post('/signup',(req,res)=>{
    const {email,phone,password}=req.body
    if(!email || !phone || !password){
        return apiResponse(res,401,"fill the email, phone, password properly")
    }

    users.push(req.body);
    return apiResponse(res,201,"user register successfully",users);
    
})

authRouter.post('/signin',(req,res)=>{
    const {email,password}=req.body
    const isUserExist=users.find((user)=>user.email===email && user.password===password);
    if(!isUserExist){
        return apiResponse(res,404,"invalid user")
    }

    const token=generateToken(isUserExist);
    return apiResponse(res,200,"user logged in successfully",token);
})

authRouter.get('/dashboard',tokenVerify,(req,res)=>{
    return apiResponse(res,200,"you are authorize user",req.user)
})

export default authRouter;
