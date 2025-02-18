import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, enviarPosts, uploadImagem, atualizarNovoPost, deletarPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: [
        "https://rannya7x.github.io",
        "http://localhost:8000/posts",
        "http://127.0.0.1:5500"
    ],
    optionsSuccessStatus: 200
}

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
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);
    app.post("/posts", enviarPosts);
    app.post("/uploads", upload.single("imagem"), uploadImagem);
    app.put("/uploads/:id", atualizarNovoPost)
    app.delete("/posts/:id", deletarPost)
}

export default routes;
