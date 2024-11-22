import express from "express";
import multer from "multer";
import { listarPosts, enviarPosts } from "../controllers/postsController.js";


const routes = (app) =>{
    app.use(express.json());
    app.get("/posts", listarPosts);
    app.post("/posts", enviarPosts);
    
}

export default routes;

