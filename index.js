import express from "express";
import { PORT, UserBaseRoute } from "./src/helper/constant.js";
import userRoute from "./src/rest-api/user.js";
import productRoute from "./src/rest-api/product.js";
import authRouter from "./src/rest-api/auth.js";

const app=express();
app.use(express.json())

//user routes
app.use(UserBaseRoute+'/users',userRoute);

//product routes
app.use(UserBaseRoute+'/products',productRoute)

//auth routers
app.use(UserBaseRoute+'/auth',authRouter);

app.listen(PORT,()=>{
    console.log(`your server is running on port ${PORT}`)
})

