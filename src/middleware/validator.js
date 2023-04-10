import apiResponse from "../helper/apiResponse.js"

//input validator for user 
export const userInputValidator=(req,res,next)=>{
    const {id,name,email,phone}=req.body
    if(!id || !name || !email || !phone){
        return apiResponse(res,404,"please fill the data properly")
    }
    next()
}

//input validator for product
export const productInputValidator=(req,res,next)=>{
    const {id,title,body}=req.body
    if(!id || !title || !body){
        return apiResponse(res,404,"please fill the data properly")
    }
    next()
}


