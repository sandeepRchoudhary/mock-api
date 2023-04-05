import apiResponse from "../helper/apiResponse.js"

export const inputValidator=(req,res,next)=>{
    const {id,name,email,phone}=req.body
    if(!id || !name || !email || !phone){
        return apiResponse(res,404,"please fill the data properly")
    }
    next()
}

export const productInputValidator=(req,res,next)=>{
    const {id,title,body}=req.body
    if(!id || !title || !body){
        return apiResponse(res,404,"please fill the data properly")
    }
    next()
}

export const pagination=(arr,pageNumber=1,perPage=10)=>{
    const perPagePagination=arr.slice((pageNumber-1)*perPage,pageNumber*perPage);
    return perPagePagination;
}