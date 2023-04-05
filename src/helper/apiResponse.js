const apiResponse=(res,statusCode,message,data=null)=>{
   return res.status(statusCode).json({"message":message,"result":data});
}
export default apiResponse;