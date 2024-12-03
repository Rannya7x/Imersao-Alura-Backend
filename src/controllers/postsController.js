import { getTodosPosts, criarPosts, atualizarPost } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/serviceGemini.js";

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
        descricao: "",
        imgUrl: req.file.originalName,
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

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `https://imersao-alura-backend.onrender.com/${id}.jpg`
    
    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postAtualizado = await atualizarPost(id, post);
        res.status(200).json(postAtualizado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

