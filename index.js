import express from "express";
import { dynamicData } from "./data.js";

const app=express();
app.use(express.json())
const PORT=8000;
const data=dynamicData
app.get("/data",(req,res)=>{
    const resData=data;
    res.status(200).json({"mydata":resData})

})
app.get("/data/:id",(req,res)=>{
    const singleUser=req.params.id
    let user=data.find((data)=>data.id==singleUser);
    res.status(200).json({"single_user":user})
})
app.delete('/data/:id',(req,res)=>{
    const deluser=req.params.id;
    let deleteUser=data.filter((data)=>data.id!=deluser);
    res.status(200).json({"deleted_data":deleteUser})
})

app.post("/data",(req,res)=>{
    data.push(req.body);  
    res.status(201).json({"isCreated":data});
});

app.put('/data',(req,res)=>{
    const{_id,name,email,phone}=req.body
    const isExists=data.find((data)=>data._id==_id);
   isExists._id=_id
   isExists.name=name
   isExists.email=email
   isExists.phone=phone
    res.status(200).json({"data":data})
})
app.listen(PORT,()=>{
    console.log("your server is running on port 8000")
})

