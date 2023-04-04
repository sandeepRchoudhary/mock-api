const apiResponse=(res,statusCode,message,userData=null)=>{
   return res.status(statusCode).json({"message":message,"result":userData})
}
export default apiResponse;