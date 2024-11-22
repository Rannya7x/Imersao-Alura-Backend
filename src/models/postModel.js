import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-Alura");
    const colecao = db.collection("posts");

    return colecao.find().toArray();
}

export async function criarPosts(novoPost) {
    const db = conexao.db("imersao-Alura");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost);
}