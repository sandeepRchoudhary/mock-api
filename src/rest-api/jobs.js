import express from "express";
import jobsData from "../mock-data/job.js";
import apiResponse from "../helper/apiResponse.js";
import { findById, removeById ,pagination } from "../helper/commonFunction.js";


const jobsRouter = express.Router();

const jobs = jobsData;

jobsRouter.get("/", (req, res) => {
    if (jobs) {
        return apiResponse(res, 200, "fetched all jobs data", jobs)
    }
    return apiResponse(res, 404, "no jobs found")
})

//pagination
jobsRouter.get("/q?",(req,res)=>{
    const{page_number,per_page}=req.query
    const jobsPerPage=pagination(jobs,page_number,per_page);
    return apiResponse(res,200,"data fetched successfully",jobsPerPage)
})

//getting single user by id
jobsRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const isJobExists = findById(jobs, id);
    if (isJobExists) {
        return apiResponse(res, 200, "jobs fetched successfully", isJobExists)
    }
    return apiResponse(res, 404, "no job found")
})

//create jobs
jobsRouter.post("/", (req, res) => {
    const { id,
        job_title,
        thumbnail,
        posted_at,
        views,
        salary,
        short_description,
        long_description } = req.body
    if (!id || !job_title || !thumbnail || !posted_at || !views || !salary || !short_description || !long_description) {
        return apiResponse(res, 401, "please fill all the data properly");
    }
    return apiResponse(res, 200, "jobs created successfully", jobs)
})

//deleting single user
jobsRouter.delete("/:id", (req, res) => {
    const id = req.params.id
    const isJobExists = findById(jobs, id);
    if (isJobExists) {
        const remainingData = removeById(jobs, id)
        return apiResponse(res, 200, "deleted successfully", remainingData)
    }

    return apiResponse(res, 404, "data not found");

})

//updating single user by id
jobsRouter.patch("/", (req, res) => {
    const { id, 
        job_title,
        thumbnail,
        posted_at,
        views,
        salary,
        short_description,
        long_description } = req.body;
    const isJobExists = findById(jobs, id);
    if (isJobExists) {
        isJobExists.job_title = job_title ? job_title : isJobExists.job_title
        isJobExists.thumbnail = thumbnail ? thumbnail : isJobExists.thumbnail
        isJobExists.posted_at = posted_at ? posted_at : isJobExists.posted_at
        isJobExists.views = views ? views : isJobExists.views
        isJobExists.salary = salary ? salary : isJobExists.salary
        isJobExists.short_description = short_description ? short_description : isJobExists.short_description
        isJobExists.long_description = long_description ? long_description : isJobExists.long_description
    jobs.map((job)=>{
        return job.id==id?job=isJobExists:job
    })
    return apiResponse(res,201,"jobs updated successfully",jobs)
    }
    return apiResponse(res,404,"data not found")
})

export default jobsRouter;
