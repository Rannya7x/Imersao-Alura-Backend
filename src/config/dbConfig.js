import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao banco...");
        await mongoClient.connect();
        console.log("Conectado...");

        return MongoClient
    } catch (error) {
        console.log("Erro: ", error);
        process.exit();
    }
}