import { getTodosPosts, criarPosts } from "../models/postModel.js";
import fs from "fs";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

export async function enviarPosts(req, res) {
    const novoPost = req.body;

    try{
        const postCriado = await criarPosts(novoPost);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novaImagem = {
        descrição: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const imagemCriada = await criarPosts(novaImagem);

        const imagemAtualizada = `uploads/${imagemCriada.insertedId}.jpg`
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(200).json(imagemCriada);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}
