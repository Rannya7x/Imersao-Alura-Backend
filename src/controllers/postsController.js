import { getTodosPosts, criarPosts } from "../models/postModel.js";

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


