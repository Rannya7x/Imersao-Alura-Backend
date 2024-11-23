import { ObjectId } from "mongodb";
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

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-Alura");
    const colecao = db.collection("posts");

    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id : new ObjectId(objectId)}, {$set:novoPost});
}