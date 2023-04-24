import express from "express";
import { movieData } from "../mock-data/movie.js";
import apiResponse from "../helper/apiResponse.js";
import { findById, pagination, removeById } from "../helper/commonFunction.js";

const movieRouter = express.Router();

const movies = movieData;

//getting all movies
movieRouter.get("/", (req, res) => {
    console.log(movies)
    if (movies) {
        return apiResponse(res, 200, "all movies fetched successfully", movies)
    }
    return apiResponse(res, 404, "no data found");
})

//pagination 
movieRouter.get("/q?",(req,res)=>{
    const {page_number,per_page}=req.query
    const movieDataPerPage=pagination(movies,page_number,per_page);
    return apiResponse(res,200,"movie data fetched successfully",movieDataPerPage);
})

//getting single movie by id
movieRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const gettingSingleMovieById = findById(movies, id);
    if (gettingSingleMovieById) {
        return apiResponse(res, 200, "movie fetched successfully", gettingSingleMovieById)
    }
    return apiResponse(res, 404, "no movie found")
})

//creating movie
movieRouter.post("/", (req, res) => {
    const { id,
        title,
        genres,
        published,
        thumbnail,
        budget,
        box_office_collection,
        short_description,
        long_description } = req.body
    if (!id || !title || !genres || !published || !thumbnail || !budget || !box_office_collection || !short_description || !long_description) {
        return apiResponse(res, 401, "please fill all the field properly")
    }
    movies.push(req.body);
    return apiResponse(res, 201, "movie created successfully", movies);
})

//deleting movie by id
movieRouter.delete("/:id", (req, res) => {
    const id = req.params.id
    const isMovieExists = findById(movies, id);
    if (isMovieExists) {
        const deleteMovieById = removeById(movies, id);
        return apiResponse(res, 200, "movie deleted successfully", deleteMovieById);
    }
    return apiResponse(res, 404, "no movie found");
})

//updating movie by id
movieRouter.patch("/", (req, res) => {
    const { id,
        title,
        genres,
        published,
        thumbnail,
        budget,
        box_office_collection,
        short_description,
        long_description } = req.body

    const isMovieExists = findById(movies, id);
    if (isMovieExists) {
        isMovieExists.title = title ? title : isMovieExists.title;
        isMovieExists.genres = genres ? genres : isMovieExists.genres;
        isMovieExists.published = published ? published : isMovieExists.published;
        isMovieExists.thumbnail = thumbnail ? thumbnail : isMovieExists.thumbnail;
        isMovieExists.budget = budget ? budget : isMovieExists.budget;
        isMovieExists.box_office_collection = box_office_collection ? box_office_collection : isMovieExists.box_office_collection;
        isMovieExists.short_description = short_description ? short_description : isMovieExists.short_description
        isMovieExists.long_description = long_description ? long_description : isMovieExists.long_description

        movies.map((movie) => movie.id == id ? movie = isMovieExists : movie)

        return apiResponse(res,201,"movie updated successfully",movies);
    }
    return apiResponse(res,404,"no movie found")

})

export default movieRouter;