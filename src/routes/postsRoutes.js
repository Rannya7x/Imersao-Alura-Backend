import express from "express";
import multer from "multer";
import { listarPosts, enviarPosts, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage});

const routes = (app) =>{
    app.use(express.json());
    app.get("/posts", listarPosts);
    app.post("/posts", enviarPosts);
    app.post("/uploads", upload.single("imagem"), uploadImagem);
    app.put("/uploads/:id", atualizarNovoPost)
}

export default routes;