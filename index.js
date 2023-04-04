import express from "express";
import { PORT, UserBaseRoute } from "./src/helper/constant.js";
import userRoute from "./src/rest-api/user.js";
import productRoute from "./src/rest-api/peoduct.js";

const app=express();
app.use(express.json())
app.use(UserBaseRoute,userRoute);
app.use(UserBaseRoute,productRoute)

app.listen(PORT,()=>{
    console.log("your server is running on port 8000")
})

