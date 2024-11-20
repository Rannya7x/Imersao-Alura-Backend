import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

await conectarAoBanco(process.env.STRING_CONEXAO);

const posts = [
    {
        id: 1,
        titulo: "Millie, a gata mais fofa",
        descricao: "Uma gata adorável posando para a câmera.",
        imagem: "https://placecats.com/millie/300/150",
        data: "2023-11-22",
        autor: "João Silva"
    },
    {
        id: 2,
        titulo: "Paisagem deslumbrante",
        descricao: "Um pôr do sol incrível na praia.",
        imagem: "https://source.unsplash.com/random/300x150/?sunset,beach",
        data: "2023-11-23",
        autor: "Ana Martins"
    },
    {
        id: 3,
        titulo: "Comida deliciosa",
        descricao: "Um prato de pasta caseira.",
        imagem: "https://source.unsplash.com/random/300x150/?pasta,food",
        data: "2023-11-24",
        autor: "Pedro Costa"
    },
    {
        id: 4,
        titulo: "Cachorro brincando",
        descricao: "Um golden retriever correndo no parque.",
        imagem: "https://source.unsplash.com/random/300x150/?dog,park",
        data: "2023-11-25",
        autor: "Maria Oliveira"
    },
    {
        id: 5,
        titulo: "Montanhas nevadas",
        descricao: "Uma vista panorâmica das montanhas cobertas de neve.",
        imagem: "https://source.unsplash.com/random/300x150/?mountains,snow",
        data: "2023-11-26",
        autor: "Carlos Santos"
    },
    {
        id: 6,
        titulo: "Café da manhã perfeito",
        descricao: "Um café da manhã com frutas frescas e panquecas.",
        imagem: "https://source.unsplash.com/random/300x150/?breakfast,food",
        data: "2023-11-27",
        autor: "Ana Martins"
    },
    {
        id: 7,
        titulo: "Cidade iluminada à noite",
        descricao: "Uma vista aérea da cidade à noite.",
        imagem: "https://source.unsplash.com/random/300x150/?city,night",
        data: "2023-11-28",
        autor: "Pedro Costa"
    }
];

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Servidor escutando...");
});

app.get("/posts",(req, res)=>{
    res.status(200).json(posts);
});

function buscarPostPorId(id){
    return posts.findIndex((post)=>{
        return post.id === Number(id);
    });
};

app.get("/posts/:id", (req, res)=>{
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});